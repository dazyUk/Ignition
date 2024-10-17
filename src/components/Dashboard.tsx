import React from 'react';
import { TelemetryData } from '../types';
import LocationCard from './LocationCard';

interface DashboardProps {
  data: TelemetryData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="grid gap-8">
      {Object.entries(data).map(([location, locationData]) => (
        <LocationCard key={location} location={location} data={locationData} />
      ))}
    </div>
  );
};

export default Dashboard;