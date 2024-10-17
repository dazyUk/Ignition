import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { fetchTelemetryData } from './api/telemetryApi';
import { TelemetryData } from './types';

function App() {
  const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTelemetryData();
        setTelemetryData(data);
      } catch (error) {
        console.error('Error fetching telemetry data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-teal-600 p-8">
      {telemetryData ? (
        <Dashboard data={telemetryData} />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-white text-2xl">Loading telemetry data...</p>
        </div>
      )}
    </div>
  );
}

export default App;