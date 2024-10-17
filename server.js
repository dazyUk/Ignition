import express from 'express';
import cors from 'cors';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

connectToDatabase();

app.get('/api/telemetry', async (req, res) => {
  try {
    const result = await sql.query`
      SELECT 
        l.Name AS Location,
        st.Name AS TankName,
        st.Level,
        st.Capacity,
        p.Name AS PlantName,
        t.Status AS TrainStatus,
        vb.BankNumber
      FROM 
        Locations l
        LEFT JOIN StorageTanks st ON l.Id = st.LocationId
        LEFT JOIN Plants p ON l.Id = p.LocationId
        LEFT JOIN Trains t ON p.Id = t.PlantId
        LEFT JOIN ValveBanks vb ON l.Id = vb.LocationId
    `;

    const telemetryData = {};

    result.recordset.forEach(record => {
      if (!telemetryData[record.Location]) {
        telemetryData[record.Location] = {
          storageTanks: [],
          plants: {},
          valveBanks: new Set(),
        };
      }

      if (record.TankName) {
        telemetryData[record.Location].storageTanks.push({
          name: record.TankName,
          level: record.Level,
          capacity: record.Capacity,
        });
      }

      if (record.PlantName) {
        if (!telemetryData[record.Location].plants[record.PlantName]) {
          telemetryData[record.Location].plants[record.PlantName] = [];
        }
        telemetryData[record.Location].plants[record.PlantName].push(record.TrainStatus);
      }

      if (record.BankNumber) {
        telemetryData[record.Location].valveBanks.add(record.BankNumber);
      }
    });

    // Convert plants object to array and valve banks set to array
    Object.keys(telemetryData).forEach(location => {
      telemetryData[location].plants = Object.entries(telemetryData[location].plants).map(([name, trains]) => ({
        name,
        trains,
      }));
      telemetryData[location].valveBanks = Array.from(telemetryData[location].valveBanks);
    });

    res.json(telemetryData);
  } catch (err) {
    console.error('Error fetching telemetry data:', err);
    res.status(500).json({ error: 'An error occurred while fetching telemetry data' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});