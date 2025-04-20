import React from 'react';
import PropTypes from 'prop-types';
import { createRoom } from './Room';
import DoubleWinderStaircase from './DoubleWinderStaircase';
import Roof from './Roof';

const BuildingB2B5 = ({ position, buildingData, onRoomHover, onRoomClick, hoveredRoom, buildingName }) => {
  const floorHeight = 2;
  const roomWidth = 1.5;
  const roomDepth = 3;

  // Group rooms by floor
  const roomsByFloor = {};
  Object.values(buildingData).forEach(room => {
    if (!roomsByFloor[room.floor]) {
      roomsByFloor[room.floor] = [];
    }
    roomsByFloor[room.floor].push(room);
  });

  const roomOptions = {
    floorHeight,
    roomWidth,
    roomDepth,
    hoveredRoom,
    onRoomClick,
    onRoomHover
  };

  // Calculate building dimensions for roof
  const totalWidth = 15 * (roomWidth + 0.2); // Total width for all rooms
  const totalDepth = roomDepth; // Single row depth
  const maxFloorHeight = Math.max(...Object.keys(roomsByFloor).map(Number)) * floorHeight * 1.2;

  return (
    <group position={position}>
      {Object.entries(roomsByFloor).map(([floor, rooms]) => {
        const floorY = (parseInt(floor) - 1) * floorHeight * 1.2;
        
        return (
          <group key={floor}>
            {rooms.map((room) => {
              const roomIndex = parseInt(room.roomNumber);
              let x = 0;
              
              if (roomIndex <= 7) {
                x = -(8 - roomIndex) * (roomWidth + 0.2);
              } else if (roomIndex >= 8) {
                x = ((roomIndex - 8) + 1) * (roomWidth + 0.2);
              }
              
              return createRoom(room, x, floorY, 0, roomOptions);
            })}
            
            <DoubleWinderStaircase 
              position={[0, floorY, -roomDepth/2]}
              height={floorHeight * 1.2}
            />
          </group>
        );
      })}

      {/* Add roof */}
      <Roof
        width={totalWidth}
        depth={totalDepth}
        position={[0, maxFloorHeight, 0]}
        buildingName={buildingName}
      />
    </group>
  );
};

BuildingB2B5.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  buildingData: PropTypes.object.isRequired,
  onRoomHover: PropTypes.func.isRequired,
  onRoomClick: PropTypes.func.isRequired,
  hoveredRoom: PropTypes.object,
  buildingName: PropTypes.string.isRequired
};

export default BuildingB2B5;