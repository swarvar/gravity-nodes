export default function Node(props: any) {
  const position = props.position;
  const title = props.title;

  const [nodeColor, setNodeColor] = useState("white");

  function onPointerOverNode() {
    setNodeColor("hotpink");
  }

  function onPointerOutNode() {
    setNodeColor("white");
  }

  return (
    <mesh
      position={position}
      onPointerOver={onPointerOverNode}
      onPointerOut={onPointerOutNode}
    >
      <meshBasicMaterial color={nodeColor} />
      <sphereGeometry args={[0.16, 30, 30]} />
    </mesh>
  );
}
