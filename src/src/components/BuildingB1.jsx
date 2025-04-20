import React from 'react';
import PropTypes from 'prop-types';
import { createRoom } from './Room';
import DoubleWinderStaircase from './DoubleWinderStaircase';
import Roof from './Roof';

const BuildingB1 = ({ position, buildingData, onRoomHover, onRoomClick, hoveredRoom }) => {
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
  const totalWidth = 17 * (roomWidth + 0.2); // Total width of the U-shaped building
  const totalDepth = 3 * (roomDepth + 0.2); // Total depth including the U shape
  const maxFloorHeight = Math.max(...Object.keys(roomsByFloor).map(Number)) * floorHeight * 1.2;

  return (
    <group position={position}>
      {Object.entries(roomsByFloor).map(([floor, rooms]) => {
        const floorY = (parseInt(floor) - 1) * floorHeight * 1.2;
        
        return (
          <group key={floor}>
            {rooms.map((room) => {
              let x = 0, z = 0;
              const roomIndex = parseInt(room.roomNumber);
              
              if (roomIndex <= 15) {
                let xOffset = 0;
                if (roomIndex >= 8) {
                  xOffset = 1 * (roomWidth + 0.2);
                }
                if (roomIndex >= 16) {
                  xOffset = 2 * (roomWidth + 0.2);
                }
                x = (roomIndex - 8) * (roomWidth + 0.2) + xOffset;
                z = 0;
              } else if (roomIndex <= 17) {
                x = 8 * (roomWidth + 0.2);
                z = (roomIndex - 15) * (roomDepth + 0.2);
              } else {
                x = -7 * (roomWidth + 0.2);
                z = (roomIndex - 17) * (roomDepth + 0.2);
              }
              
              return createRoom(room, x, floorY, z, roomOptions);
            })}
            
            <DoubleWinderStaircase 
              position={[0, floorY, -roomDepth/2]}
              height={floorHeight * 1.2}
            />
          </group>
        );
      })}

      {/* Add U-shaped roof */}
      <Roof
        width={totalWidth}
        depth={totalDepth}
        position={[1, maxFloorHeight, 0]}
        buildingName="Khu B1"
        isUShape={true}
      />
    </group>
  );
};

BuildingB1.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  buildingData: PropTypes.object.isRequired,
  onRoomHover: PropTypes.func.isRequired,
  onRoomClick: PropTypes.func.isRequired,
  hoveredRoom: PropTypes.object
};

export default BuildingB1;