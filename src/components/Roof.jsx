import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@react-three/drei';

const Roof = ({ width, depth, position, buildingName, isUShape }) => {
  const roofHeight = 1.5;
  const overhang = 0.5;
  const roofColor = "#8B4513";

  if (isUShape) {
    return (
      <group position={position}>
        {/* Left wing */}
        <mesh position={[-width/4, roofHeight/2-0.8, depth/2]}>
          <boxGeometry args={[width/2 + overhang, roofHeight, depth + overhang]} />
          <meshStandardMaterial color={roofColor} />
        </mesh>

        {/* Right wing */}
        <mesh position={[width/4, roofHeight/2-0.8, depth/2]}>
          <boxGeometry args={[width/2 + overhang, roofHeight, depth + overhang]} />
          <meshStandardMaterial color={roofColor} />
        </mesh>

        {/* Back connection */}
        <mesh position={[0, roofHeight/2-0.8, 0]}>
          <boxGeometry args={[width + overhang*2, roofHeight, depth/3 + overhang]} />
          <meshStandardMaterial color={roofColor} />
        </mesh>

        {/* Building name text */}
        <Text
          position={[0, roofHeight + 0.9, 0]}
          fontSize={2.5}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
          height={0.5}
          bevelEnabled={true}
          bevelSize={0.05}
          bevelThickness={0.05}
          material-metalness={0.8}
          material-roughness={0.1}
        >
          {buildingName}
        </Text>
      </group>
    );
  }

  return (
    <group position={position}>
      {/* Main roof structure */}
      <mesh position={[0, roofHeight/2-0.8, 0]}>
        <boxGeometry args={[width + overhang*2, roofHeight, depth + overhang*2]} />
        <meshStandardMaterial color={roofColor} />
      </mesh>

      {/* Building name text */}
      <Text
        position={[0, roofHeight + 0.9, 0]}
        fontSize={2.5}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
        height={0.5}
        bevelEnabled={true}
        bevelSize={0.05}
        bevelThickness={0.05}
        material-metalness={0.8}
        material-roughness={0.1}
      >
        {buildingName}
      </Text>
    </group>
  );
};

Roof.propTypes = {
  width: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  buildingName: PropTypes.string.isRequired,
  isUShape: PropTypes.bool
};

export default Roof;