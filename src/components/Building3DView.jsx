import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Tooltip from './Tooltip';
import BuildingB1 from './BuildingB1';
import BuildingB2 from './BuildingB2';
import BuildingB5 from './BuildingB5';

const CoordinateGizmo = () => {
  return (
    <group>
      {/* X axis - Red */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[4, 0.1, 0.1]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      
      {/* Y axis - Green */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.1, 4, 0.1]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>
      
      {/* Z axis - Blue */}
      <mesh position={[0, 0, 2]}>
        <boxGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#0000ff" />
      </mesh>
    </group>
  );
};

const Building3DView = ({ rooms, onRoomSelect }) => {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const containerRef = useRef();
  const controlsRef = useRef();

  // Group rooms by building
  const buildingRooms = {
    B1: Object.values(rooms).filter(room => room.building === 'B1'),
    B2: Object.values(rooms).filter(room => room.building === 'B2'),
    B5: Object.values(rooms).filter(room => room.building === 'B5')
  };

  const focusOnB1 = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(0, 5, 30);
      controlsRef.current.target.set(0, 5, 0);
      controlsRef.current.update();
    }
  };

  const focusOnB2 = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(-30, 5, -17);
      controlsRef.current.target.set(-11, 5, -17);
      controlsRef.current.update();
    }
  };

  const focusOnB5 = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(30, 5, -15);
      controlsRef.current.target.set(13, 5, -15);
      controlsRef.current.update();
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Canvas
        camera={{ position: [30, 30, 30], fov: 60 }}
        style={{ background: '#f5f5f5' }}
      >
        {/* Ambient light for overall scene illumination */}
        <ambientLight intensity={0.7} />
        
        {/* Main directional light (like sunlight) */}
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={0.8}
          castShadow
        />
        
        {/* Additional point lights for better building details */}
        <pointLight 
          position={[0, 15, 0]} 
          intensity={0.5}
          color="#ffffff"
        />
        <pointLight 
          position={[-15, 10, -15]} 
          intensity={0.3}
          color="#ffe5b4"
        />
        <pointLight 
          position={[15, 10, -15]} 
          intensity={0.3}
          color="#ffe5b4"
        />

        {/* Coordinate System Gizmo */}
        <CoordinateGizmo />
        
        <group>
          <group position={[-11, 0, -18]} rotation={[0, -Math.PI / 2, 0]}>
            <BuildingB2
              position={[0, 0, 0]}
              buildingData={buildingRooms.B2}
              onRoomHover={setHoveredRoom}
              onRoomClick={onRoomSelect}
              hoveredRoom={hoveredRoom}
              onBuildingNameClick={focusOnB2}
            />
          </group>

          <BuildingB1
            position={[0, 0, 0]}
            buildingData={buildingRooms.B1}
            onRoomHover={setHoveredRoom}
            onRoomClick={onRoomSelect}
            hoveredRoom={hoveredRoom}
            onBuildingNameClick={focusOnB1}
          />

          <group position={[13, 0, -17]} rotation={[0, Math.PI / 2, 0]}>
            <BuildingB5
              position={[0, 0, 0]}
              buildingData={buildingRooms.B5}
              onRoomHover={setHoveredRoom}
              onRoomClick={onRoomSelect}
              hoveredRoom={hoveredRoom}
              onBuildingNameClick={focusOnB5}
            />
          </group>
        </group>

        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          target={[0, 5, 0]}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {hoveredRoom && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '20px',
            transform: 'translateX(-50%)',
            zIndex: 1000
          }}
        >
          <Tooltip room={hoveredRoom} />
        </div>
      )}
    </div>
  );
};

Building3DView.propTypes = {
  rooms: PropTypes.object.isRequired,
  onRoomSelect: PropTypes.func.isRequired
};

export default Building3DView;