'use client';

import dynamic from "next/dynamic";

import { SORTED_PROJECTS } from "./constants";
import CanvasLoader from "./components/common/CanvasLoader";
import DeviceGate from "./components/common/DeviceGate";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";
import { usePortalStore } from "./stores";

const ExpandedProjectCard = dynamic(() => import("./components/experience/projects/ExpandedProjectCard"));

const Home = () => {
  const expandedProjectId = usePortalStore((state) => state.expandedProjectId);
  const setExpandedProjectId = usePortalStore((state) => state.setExpandedProjectId);

  return (
    <>
      <DeviceGate>
        <CanvasLoader>
          <ScrollWrapper>
            <Hero/>
            <Experience/>
            <Footer/>
          </ScrollWrapper>
        </CanvasLoader>
      </DeviceGate>
      {expandedProjectId !== null && (
        <ExpandedProjectCard
          project={SORTED_PROJECTS[expandedProjectId]}
          onClose={() => setExpandedProjectId(null)}
        />
      )}
    </>
  );
};
export default Home;
