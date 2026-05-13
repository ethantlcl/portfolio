import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import ProjectTile from "./ProjectTile";

import { SORTED_PROJECTS } from "@constants";
import { usePortalStore } from "@stores";

const ProjectsCarousel = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "projects");
  const expandedProjectId = usePortalStore((state) => state.expandedProjectId);
  const setExpandedProjectId = usePortalStore((state) => state.setExpandedProjectId);

  useEffect(() => {
    if (!isActive) {
      setActiveId(null);
      setExpandedProjectId(null);
    }
  }, [isActive, setExpandedProjectId]);

  const onClick = (id: number) => {
    if (expandedProjectId !== null) return;
    if (!isMobile) return;
    setActiveId(id === activeId ? null : id);
  };

  const tiles = useMemo(() => {
    const fov = Math.PI * 0.9;
    const distance = 13;
    const count = SORTED_PROJECTS.length;
    const centerIndex = (count - 1) / 2;
    const angleStep = count > 1 ? fov / (count - 1) : 0;

    return SORTED_PROJECTS.map((project, i) => {
      const angle = (i - centerIndex) * angleStep;
      const x = distance * Math.sin(angle);
      const z = -distance * Math.cos(angle);
      const rotY = -angle;

      return (
        <ProjectTile
          key={i}
          project={project}
          index={i}
          position={[x, 1, z]}
          rotation={[0, rotY, 0]}
          activeId={activeId}
          isDetailOpen={expandedProjectId !== null}
          onClick={() => onClick(i)}
          onView={() => setExpandedProjectId(i)}
        />
      );
    });
  }, [activeId, expandedProjectId, setExpandedProjectId]);

  return (
    <group rotation={[0, 0, 0]}>
      {tiles}
    </group>
  );
};

export default ProjectsCarousel;
