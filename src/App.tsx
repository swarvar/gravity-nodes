import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import { Physics } from "@react-three/cannon";
import { useControls } from "leva";
import Plane from "components/Plane";
import Balls from "components/Balls";
import { useSphere } from "@react-three/cannon";

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function Node(props: any) {
  const position = props.position
  const title = props.title

  const [nodeColor, setNodeColor] = useState('white')

  function onPointerOverNode(){
    setNodeColor('hotpink')
  }

  function onPointerOutNode(){
    setNodeColor('white')
  }

  function onClickNode(){}

  const [nodeRef] = useSphere(() => ({
    mass: 1,
    // args: [radius],
    // position,
    friction: 0.1,
    // onCollide: playAudio,
  }));

  return (
    <mesh ref={nodeRef} position={position} onPointerOver={onPointerOverNode} onPointerOut={onPointerOutNode} onClick={onClickNode}>
      <meshBasicMaterial color={nodeColor} />
      <sphereGeometry args={[0.16, 30, 30]} />
    </mesh>
  );
}

const App = () => {
  const nodes = new Array(10).fill("").map((node, i) => `Node ${i + 1}`);

  const { gravity } = useControls({ gravity: { value: [0, -9.81, 0], step: 0.2 } })

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas
        // orthographic
        camera={{
          // position: [0, 5, 0],
          fov: 360,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#252934");
        }}
      >
        <Physics allowSleep broadphase="SAP" gravity={gravity} defaultContactMaterial={{ friction: 0.1, restitution: 0.1 }}>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          {nodes.map((node, i) => {
            const x = randomNumber(-2, 2)
            const y = randomNumber(0, 4)
            const position = [x ,y, -2]
           return <Node key={i} title={`Node ${i+1}`} position={position} />
          })}
          {/* <Balls /> */}
          <Plane size={[200, 200]} />
        </Suspense>
        </Physics>
      </Canvas>
    </div>
  );
};

export default App;
