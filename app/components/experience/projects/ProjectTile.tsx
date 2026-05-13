import { Edges, Text, TextProps } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { usePortalStore } from "@stores";
import { Project } from "@types";

interface ProjectTileProps {
  project: Project;
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  activeId: number | null;
  isDetailOpen: boolean;
  onClick: () => void;
  onView: () => void;
}

const ProjectTile = ({
  project,
  index,
  position,
  rotation,
  activeId,
  isDetailOpen,
  onClick,
  onView,
}: ProjectTileProps) => {
  const tileRef = useRef<THREE.Group>(null);
  const projectRef = useRef<THREE.Group>(null);
  const hoverAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [hovered, setHovered] = useState(false);
  const isProjectSectionActive = usePortalStore((state) => state.activePortalId === "projects");

  const titleProps = useMemo(() => ({
    font: "./soria-font.ttf",
    color: "black",
  }), []);

  const subtitleProps: Partial<TextProps> = useMemo(() => ({
    font: "./Vercetti-Regular.woff",
    color: "black",
    anchorX: "left",
    anchorY: "top",
  }), []);

  useEffect(() => {
    if (!projectRef.current) return;
    hoverAnimRef.current?.kill();

    const [mesh, title, dateGroup, textBox, button] = projectRef.current.children;

    hoverAnimRef.current = gsap.timeline();
    hoverAnimRef.current
      .to(projectRef.current.position, { z: hovered ? 1 : 0, duration: 0.2 }, 0)
      .to(projectRef.current.position, { y: hovered ? 0.4 : 0 }, 0)
      .to(projectRef.current.scale, {
        x: hovered && !isDetailOpen ? 1.3 : 1,
        y: hovered && !isDetailOpen ? 1.3 : 1,
        z: hovered && !isDetailOpen ? 1.3 : 1,
      }, 0)
      .to(title.position, { y: hovered && !isDetailOpen ? 0.7 : -0.8 }, 0)
      .to(textBox.position, { y: hovered && !isDetailOpen ? 0.7 : 0 }, 0)
      .to(textBox, { fillOpacity: hovered && !isDetailOpen ? 1 : 0, duration: 0.4 }, 0)
      .to(dateGroup.position, { y: hovered && !isDetailOpen ? 2.6 : 1.4 }, 0)
      .to(mesh.scale, { y: hovered && !isDetailOpen ? 2 : 1 }, 0)
      .to((mesh as THREE.Mesh).material, { opacity: isDetailOpen ? 0.14 : hovered ? 0.95 : 0.3 }, 0)
      .to(mesh.position, { y: hovered && !isDetailOpen ? 1 : 0 }, 0)
      .to(button.scale, { y: hovered && !isDetailOpen ? 1 : 0, x: hovered && !isDetailOpen ? 1 : 0 }, 0)
      .to(button.position, { z: hovered && !isDetailOpen ? 0.3 : -1 }, 0);
  }, [hovered, isDetailOpen]);

  useEffect(() => {
    if (isMobile) {
      setHovered(activeId === index);
    }
  }, [isMobile, activeId]);

  useEffect(() => {
    if (!tileRef.current) return;
    gsap.to(tileRef.current.position, {
      x: position[0],
      y: isProjectSectionActive ? position[1] : -10,
      z: position[2],
      duration: 0.8,
      delay: isProjectSectionActive ? index * 0.1 : 0,
      ease: "power3.out",
    });

    gsap.to(tileRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [index, isProjectSectionActive, position]);

  useEffect(() => {
    if (isDetailOpen) {
      setHovered(false);
      document.body.style.cursor = "auto";
    }
  }, [isDetailOpen]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (isDetailOpen) return;
    const button = e.eventObject;
    gsap.to(button.position, { z: 0, duration: 0.1 })
      .then(() => {
        onView();
        return gsap.to(button.position, { z: 0.3, duration: 0.3 });
      });
  };

  return (
    <group
      ref={tileRef}
      position={[position[0], -10, position[2]]}
      rotation={rotation}
      onClick={isDetailOpen ? undefined : onClick}
      onPointerOver={() => !isMobile && isProjectSectionActive && !isDetailOpen && setHovered(true)}
      onPointerOut={() => !isMobile && isProjectSectionActive && setHovered(false)}>
      <group ref={projectRef}>
        <mesh>
          <planeGeometry args={[4.2, 2, 1]} />
          <meshBasicMaterial color="#FFF" transparent opacity={0.3}/>
          {/* <meshPhysicalMaterial transmission={1} roughness={0.3} /> */}
          <Edges color="black" lineWidth={1.5} />
        </mesh>
        <Text
          {...titleProps}
          position={[-1.9, -0.8, 0.101]}
          anchorX="left"
          anchorY="bottom"
          maxWidth={4}
          fontSize={0.8}>
          {project.title}
        </Text>
        <group position={[-1.25, 1.4, 0.01]}>
          <mesh>
            <planeGeometry args={[1.7, 0.4, 1]} />
            <meshBasicMaterial color="#777" opacity={0} wireframe />
            <Edges color="black" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            position={[-0.7, 0.2, 0]}
            fontSize={0.3}>
            {project.date.toUpperCase()}
          </Text>
        </group>
        <Text
          {...subtitleProps}
          maxWidth={3.8}
          position={[-1.9, 2.3, 0.1]}
          fontSize={0.2}>
          {project.subtext}
        </Text>
        <group
          position={[1.3, -0.6, -1]}
          scale={[0, 0, 1]}
          onClick={handleClick}
          onPointerOver={() => !isDetailOpen && (document.body.style.cursor = "pointer")}
          onPointerOut={() => document.body.style.cursor = "auto"}>
          <mesh>
            <boxGeometry args={[1.1, 0.4, 0.2]} />
            <meshBasicMaterial color="#222" />
            <Edges color="white" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            color="white"
            position={[-0.38, 0.15, 0.2]}
            fontSize={0.25}>
            VIEW
          </Text>
        </group>
      </group>
    </group>
  );
};

export default ProjectTile;
