'use client';

import { Cloud, Clouds } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

const REMOTE_CLOUD_TEXTURE_SRC = "https://rawcdn.githack.com/pmndrs/drei-assets/9225a9f1fbd449d9411125c2f419b843d0308c9f/cloud.png";
const LOCAL_CLOUD_TEXTURE_SRC = "/cloud-sprite.png";
const CLOUD_TEXTURE_TIMEOUT_MS = 3000;

const CloudContainer = () => {
  const [textureSrc, setTextureSrc] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const image = new Image();
    const timeoutId = window.setTimeout(() => {
      if (isActive) {
        setTextureSrc(LOCAL_CLOUD_TEXTURE_SRC);
      }
    }, CLOUD_TEXTURE_TIMEOUT_MS);

    const finish = (src: string) => {
      if (!isActive) return;

      window.clearTimeout(timeoutId);
      setTextureSrc(src);
    };

    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => finish(REMOTE_CLOUD_TEXTURE_SRC);
    image.onerror = () => finish(LOCAL_CLOUD_TEXTURE_SRC);
    image.src = REMOTE_CLOUD_TEXTURE_SRC;

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  if (textureSrc === null) {
    return null;
  }

  return (
    <Clouds material={THREE.MeshBasicMaterial}
      texture={textureSrc}
      position={[0, -5, 0]}
      frustumCulled={false}>
      <Cloud seed={1}
        segments={1}
        concentrate="inside"
        bounds={[10, 10, 10]}
        growth={3}
        position={[-1, 0, 0]}
        smallestVolume={2}
        scale={1.9}
        volume={2}
        speed={0.2}
        fade={5}
        />
      <Cloud
        seed={3}
        segments={1}
        concentrate="outside"
        bounds={[10, 10, 10]}
        growth={2}
        position={[2, 0, 2]}
        smallestVolume={2}
        scale={1}
        volume={2}
        fade={3}
        speed={0.1}/>

      <Cloud
        seed={4}
        segments={1}
        concentrate="outside"
        bounds={[10, 20, 15]}
        growth={4}
        position={[-10, -10, 4]}
        smallestVolume={2}
        scale={2}
        speed={0.2}
        volume={3}/>

      <Cloud
        seed={5}
        segments={1}
        concentrate="outside"
        bounds={[5, 5, 5]}
        growth={2}
        position={[6, -3, 8]}
        smallestVolume={2}
        scale={2}
        volume={2}
        fade={0.1}
        speed={0.1}/>

      <Cloud
        seed={6}
        segments={1}
        concentrate="outside"
        bounds={[5, 5, 5]}
        growth={2}
        position={[0, -20, 20]}
        smallestVolume={2}
        scale={4}
        volume={3}
        fade={0.1}
        speed={0.1}/>

      <Cloud
        seed={7}
        segments={1}
        concentrate="outside"
        bounds={[5, 5, 5]}
        growth={2}
        position={[10, -15, -5]}
        smallestVolume={2}
        scale={3}
        volume={3}
        fade={0.1}
        speed={0.1}/>
    </Clouds>);
}

export default CloudContainer;
