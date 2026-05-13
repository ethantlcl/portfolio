import { ScrollControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { usePortalStore, useScrollStore } from "@stores";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { Memory } from "../../models/Memory";
import Timeline from "./Timeline";

const WORK_SCROLL_SMOOTHING = 2.25;

const Work = () => {
  const isActive = usePortalStore((state) => state.activePortalId === 'work');
  const { scrollProgress, setScrollProgress } = useScrollStore();
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  const handleScroll = useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;
    targetProgressRef.current = progress;
  }, []);

  useFrame((_, delta) => {
    const nextProgress = isActive
      ? THREE.MathUtils.damp(currentProgressRef.current, targetProgressRef.current, WORK_SCROLL_SMOOTHING, delta)
      : 0;

    if (Math.abs(nextProgress - currentProgressRef.current) > 0.0001) {
      currentProgressRef.current = nextProgress;
      setScrollProgress(nextProgress);
      return;
    }

    if (currentProgressRef.current !== nextProgress) {
      currentProgressRef.current = nextProgress;
      setScrollProgress(nextProgress);
    }
  });

  // Hack: If the portal is active, add the scroll event listener to the scroll
  // wrapper div. If the portal is not active, remove the scroll event listener.
  // ScrollControls doesn't work out of the box, so we have to manually handle
  // the scroll event.
  useEffect(() => {
    if (isActive) {
      const scrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;
      const originalScrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      targetProgressRef.current = 0;
      currentProgressRef.current = 0;
      setScrollProgress(0);
      scrollWrapper.addEventListener('scroll', handleScroll)
      scrollWrapper.style.zIndex = '1';
      originalScrollWrapper.style.zIndex = '-1';
    } else {
      const scrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      const originalScrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;

      if (scrollWrapper) {
        scrollWrapper.scrollTo({ top: 0, behavior: 'smooth' });
        targetProgressRef.current = 0;
        currentProgressRef.current = 0;
        setScrollProgress(0);
        scrollWrapper.removeEventListener('scroll', handleScroll);
        scrollWrapper.style.zIndex = '-1';
        originalScrollWrapper.style.zIndex = '1';
      }
    }
  }, [handleScroll, isActive, setScrollProgress]);

  return (
    <group>
      <mesh receiveShadow>
        <planeGeometry args={[4, 4, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <ScrollControls style={{ zIndex: -1}} pages={2} maxSpeed={0.4}>
        <Memory scale={new THREE.Vector3(5, 5, 5)} position={new THREE.Vector3(0, -6, 1)}/>
        <Timeline progress={isActive ? scrollProgress : 0} />
      </ScrollControls>
    </group>
  );
};

export default Work;
