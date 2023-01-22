import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import palettes from "nice-color-palettes";
import React, { useMemo, useState } from "react";

const palette = palettes[Math.floor(Math.random() * (palettes.length - 1))];

function generateRandomBall() {
  return {
    position: [0, 20, 0],
    color: "white",
    radius: 1.6,
  };
}

export default function Balls() {
  const [balls, setBalls] = useState(() =>
    Array.from({ length: 3 }).map(generateRandomBall)
  );
  const addRandomBall = () =>
    setBalls((currBalls) => [...currBalls, generateRandomBall()]);
  const { flood } = useControls({
    "Add Ball": button(addRandomBall),
  });
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // if (flood && Math.floor(elapsedTime * 10) % 2 === 0) addRandomBall();
  });
  return balls.map((ballInfo, i) => <Ball key={i} {...ballInfo} />);
}

function Ball({ position = [0, 1, 0], color, radius }) {
  const sound = useMemo(() => new Audio("/sounds/knock.wav"), []);
  const playAudio = (collision) =>
    collision.contact.impactVelocity > 1.5 &&
    sound.play((sound.volume = radius / 5));
  const [ref] = useSphere(() => ({
    mass: 1,
    args: [radius],
    position,
    friction: 0.1,
    onCollide: playAudio,
  }));
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
