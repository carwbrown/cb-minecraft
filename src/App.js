import { Sky } from "drei";
import React from "react";
import { Canvas } from "react-three-fiber";
import { Physics } from "use-cannon";
import { nanoid } from "nanoid";

import Ground from "./components/Ground";
import { Hud } from "./components/Hud";
import { Cube } from "./components/Cube";
import { Player } from "./components/Player";
import { useStore } from "./hooks/useStore";
import { useInterval } from "./hooks/useInterval";

function App() {
  const [cubes, saveWorld] = useStore((state) => [
    state.cubes,
    state.saveWorld,
  ]);
  useInterval(() => {
    saveWorld(cubes);
  }, 10000);

  return (
    <Canvas shadowMap sRGB>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.25} />
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      <Hud position={[0, 0, -2]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground position={[0, 0.5, 0]} />
        <Player position={[0, 3, 10]} />
        {cubes?.map((cube) => {
          return (
            <Cube key={nanoid()} position={cube.pos} texture={cube.texture} />
          );
        })}
      </Physics>
    </Canvas>
  );
}

export default App;
