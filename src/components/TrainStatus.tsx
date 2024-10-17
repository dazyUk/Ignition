import React from 'react';

interface TrainStatusProps {
  status: 'Running' | 'Stopped' | 'Idle';
}

const TrainStatus: React.FC<TrainStatusProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Running':
        return 'bg-green-500';
      case 'Stopped':
        return 'bg-red-500';
      case 'Idle':
        return 'bg-gray-300';
    }
  };

  return (
    <div className={`${getStatusColor()} w-4 h-4 rounded-full`} title={status}></div>
  );
};

export default TrainStatus;