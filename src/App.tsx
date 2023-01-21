import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { Stats, OrbitControls, Text } from "@react-three/drei";
import * as three from "three";
import "./styles.css";

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function Node(props: any) {
  const position = props.position
  const title = props.title
  return (
    <mesh position={position}>
      <meshBasicMaterial />
      <sphereGeometry args={[0.16, 30, 30]} />
      <Text
        scale={[1, 1, 1]}
        color="white" // default
        anchorX="center" // default
        anchorY="middle" // default
        position={position}
      >
        {title}
      </Text>
    </mesh>
  );
}

const App = () => {
  const nodes = new Array(10).fill("").map((node, i) => `Node ${i + 1}`);
  console.log(nodes);

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
          {nodes.map((node, i) => {
            const x = randomNumber(-2, 2)
            const y = randomNumber(-2, 2)
            const position = [x ,y, 0]
           return <Node key={i} title={`Node ${i+1}`} position={position} />
          })}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
