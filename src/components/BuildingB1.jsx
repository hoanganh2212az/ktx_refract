import React from 'react';
import PropTypes from 'prop-types';
import { createRoom } from './Room';
import DoubleWinderStaircase from './DoubleWinderStaircase';
import Roof from './Roof';

const BuildingB1 = ({ position, buildingData, onRoomHover, onRoomClick, hoveredRoom, onBuildingNameClick }) => {
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
              let rotation = [0, 0, 0];
              const roomIndex = parseInt(room.roomNumber);
              const spacing = 0.2; // Consistent spacing between rooms
              const zOffset = 1; // Additional Z offset for wing rooms
              const xOffset = 2; // X offset for wing rooms
              
              // Calculate new room number based on position
              let newRoomNumber;
              if (roomIndex <= 15) {
                // Front rooms
                let xOffset = 0;
                if (roomIndex >= 8) {
                  xOffset = 1 * (roomWidth + spacing);
                }
                if (roomIndex >= 16) {
                  xOffset = 2 * (roomWidth + spacing);
                }
                x = (roomIndex - 8) * (roomWidth + spacing) + xOffset;
                z = 0;

                // Assign odd numbers to left side, even numbers to right side
                if (x < 0) {
                  // Left side (odd numbers)
                  newRoomNumber = Math.abs(Math.round(x / (roomWidth + spacing))) * 2 + 1;
                } else {
                  // Right side (even numbers)
                  newRoomNumber = Math.round(x / (roomWidth + spacing)) * 2 + 2;
                }
              } else if (roomIndex <= 17) {
                // Right wing
                x = (8 * (roomWidth + spacing)) + xOffset;
                z = ((roomIndex - 15) * (roomWidth + spacing)) + zOffset;
                rotation = [0, -Math.PI / 2, 0];
                newRoomNumber = 16 + (roomIndex - 15) * 2;
              } else {
                // Left wing
                x = (-7 * (roomWidth + spacing)) - xOffset;
                z = ((roomIndex - 17) * (roomWidth + spacing)) + zOffset;
                rotation = [0, Math.PI / 2, 0];
                newRoomNumber = 15 + (roomIndex - 17) * 2;
              }

              // Update room.id with new room number
              const [building, roomFull] = room.id.split('-');
              const newRoomId = `${building}-${roomFull[0]}${newRoomNumber.toString().padStart(2, '0')}`;
              room.id = newRoomId;
              
              return createRoom(room, x, floorY, z, {...roomOptions, rotation});
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
        onBuildingNameClick={onBuildingNameClick}
      />
    </group>
  );
};

BuildingB1.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  buildingData: PropTypes.object.isRequired,
  onRoomHover: PropTypes.func.isRequired,
  onRoomClick: PropTypes.func.isRequired,
  hoveredRoom: PropTypes.object,
  onBuildingNameClick: PropTypes.func.isRequired
};

export default BuildingB1;