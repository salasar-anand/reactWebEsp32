// screens/Esp32Data.tsx
import React from 'react';
 
import ChartOne from '../../components/Charts/ChartOne';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChartThree from '../../components/Charts/ChartThree';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import PinControl from './PinControl'; // ⬅️ Import it

const Esp32Data: React.FC = () => {
  const pinList = [2, 4, 5, 12, 13, 14, 15, 18, 19, 21, 22, 23];

  return (
    <div className="space-y-5">
      {/* Existing content */}
       {/* NEW: ESP32 Pin Controls */}
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-4">ESP32 Pin Controller</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {pinList.map((pin) => (
            <PinControl key={pin} pinNumber={pin} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:gap-6">
        {/* Cards */}
        {/* ... */}
      </div>

      {/* Charts, Map, Chat */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatCard />
        <MapOne />
      </div>

      <TableOne />

     
    </div>
  );
};

export default Esp32Data;
