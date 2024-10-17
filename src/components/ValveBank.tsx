import React from 'react';

interface ValveBankProps {
  banks: number[];
}

const ValveBank: React.FC<ValveBankProps> = ({ banks }) => {
  return (
    <div className="flex space-x-2">
      {banks.map((bank, index) => (
        <div key={index} className="bg-green-500 text-white text-center p-2 rounded font-semibold">
          {bank}
        </div>
      ))}
    </div>
  );
};

export default ValveBank;