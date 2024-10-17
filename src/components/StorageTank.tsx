import React from 'react';

interface StorageTankProps {
  name: string;
  level: number;
  capacity: number;
}

const StorageTank: React.FC<StorageTankProps> = ({ name, level, capacity }) => {
  const percentage = Math.round((level / capacity) * 100);

  return (
    <div className="flex items-center space-x-2 text-white text-sm">
      <div className="w-20 truncate">{name}</div>
      <div className="w-16 bg-teal-600 rounded-full h-2">
        <div
          className="bg-teal-300 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="w-16 text-right">
        {percentage}% ({level}/{capacity})
      </div>
    </div>
  );
};

export default StorageTank;