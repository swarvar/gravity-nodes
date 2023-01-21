import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import * as three from "three";
import "./styles.css";

function Node() {

  return (
    <mesh>
      <meshBasicMaterial />
      <sphereGeometry args={[0.16, 30, 30]} />
    </mesh>
  )
}

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
    <Canvas
    onCreated={({ gl }) => {
      gl.setClearColor("#252934");
    }}
    >
      <ambientLight intensity={0.8} />
      <Suspense fallback={null}>
        <Node />
      </Suspense>
    </Canvas>
    </div>
  );
};

export default App;
