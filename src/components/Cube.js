import React, { useState } from "react";
import { useBox } from "use-cannon";
import { useStore } from "../hooks/useStore";
import * as textures from "../textures";

export const Cube = ({ position, texture, ...props }) => {
  const [hover, setHover] = useState(null);
  const [addCube, removeCube, activeTexture] = useStore((state) => [
    state.addCube,
    state.removeCube,
    state.texture,
  ]);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
    ...props,
  }));

  return (
    <mesh
      castShadow
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        setHover(Math.floor(e.faceIndex / 2));
      }}
      onPointerOut={(e) => {
        setHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;
        if (clickedFace === 0) {
          e.shiftKey
            ? removeCube(x, y, z)
            : addCube(x + 1, y, z, activeTexture);
          return;
        }
        if (clickedFace === 1) {
          e.shiftKey
            ? removeCube(x, y, z)
            : addCube(x - 1, y, z, activeTexture);
          return;
        }
        if (clickedFace === 2) {
          e.shiftKey
            ? removeCube(x, y, z)
            : addCube(x, y + 1, z, activeTexture);
          return;
        }
        if (clickedFace === 3) {
          e.shiftKey
            ? removeCube(x, y, z)
            : addCube(x, y - 1, z, activeTexture);
          return;
        }
        if (clickedFace === 4) {
          e.shiftKey
            ? removeCube(x, y, z)
            : addCube(x, y, z + 1, activeTexture);
          return;
        }
        if (clickedFace === 5) {
          e.shiftKey
            ? removeCube(x, y, z)
            : addCube(x, y, z - 1, activeTexture);
          return;
        }
      }}
    >
      {[...Array(6)].map((_, index) => {
        return (
          <meshStandardMaterial
            attachArray="material"
            map={textures[texture]}
            key={index}
            color={hover === index ? "gray" : "white"}
            opacity={texture === "glass" ? 0.7 : 1}
            transparent
          />
        );
      })}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  );
};
