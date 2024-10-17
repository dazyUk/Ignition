import React from 'react';
import { LocationData } from '../types';
import StorageTank from './StorageTank';
import TrainStatus from './TrainStatus';
import ValveBank from './ValveBank';

interface LocationCardProps {
  location: string;
  data: LocationData;
}

const getFlagUrl = (location: string) => {
  switch (location) {
    case 'Bahamas':
      return 'https://flagcdn.com/w320/bs.png';
    case 'Cayman':
      return 'https://flagcdn.com/w320/ky.png';
    case 'BVI':
      return 'https://flagcdn.com/w320/vg.png';
    default:
      return '';
  }
};

const LocationCard: React.FC<LocationCardProps> = ({ location, data }) => {
  return (
    <div className="bg-teal-500 rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <img src={getFlagUrl(location)} alt={`${location} flag`} className="w-16 h-8 mr-2" />
        <h2 className="text-3xl font-bold text-white">{location}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Storage Tank Levels</h3>
          <div className="grid gap-1">
            {data.storageTanks.map((tank, index) => (
              <StorageTank key={index} {...tank} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Trains</h3>
          <div className="grid gap-2">
            {data.plants.map((plant, index) => (
              <div key={index} className="flex items-center">
                <span className="text-white mr-2 w-24">{plant.name}</span>
                <div className="flex-1 grid grid-cols-6 gap-1">
                  {plant.trains.map((train, trainIndex) => (
                    <TrainStatus key={trainIndex} status={train} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {data.valveBanks && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2 text-white">Valve Banks</h3>
              <ValveBank banks={data.valveBanks} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;