'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

const DeviceGate = ({ children }: { children: React.ReactNode }) => {
  const forcePreview = false;
  const [ready, setReady] = useState(false);
  const [shouldGate, setShouldGate] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    const accepted = window.sessionStorage.getItem('device-gate-accepted') === 'true';
    const touchCapable = navigator.maxTouchPoints > 1;
    const tabletSizedViewport = window.matchMedia('(max-width: 1024px)').matches;
    const needsGate = forcePreview || isMobile || isTablet || (touchCapable && tabletSizedViewport);

    setHasAccepted(accepted);
    setShouldGate(needsGate && !accepted);
    setReady(true);
  }, []);

  const handleProceed = () => {
    window.sessionStorage.setItem('device-gate-accepted', 'true');
    setHasAccepted(true);
    setShouldGate(false);
  };

  const handleLeave = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.replace('about:blank');
  };

  if (!ready) {
    return null;
  }

  if (!shouldGate || hasAccepted) {
    return <>{children}</>;
  }

  return (
    <div className="device-gate-overlay">
      <div className="device-gate-card">
        <p className="device-gate-eyebrow"> </p>
        <h1 className="device-gate-title">This portfolio was optimised for laptop and desktop browsers.</h1>
        <p className="device-gate-copy">
           Yoohoo, thanks for visiting! I can see you&apos;re visiting on a mobile device or Samsung Smart Fridge,
          so parts of the website will feel cramped😞...Please view on browser for the best experience, but if you&apos;d still like
          to look around, I'll let you pass
        </p>
        <div className="device-gate-actions">
          <button className="device-gate-button device-gate-button-primary" onClick={handleProceed}>
            Let me in!!!
          </button>
          <button className="device-gate-button device-gate-button-secondary" onClick={handleLeave}>
            I'll come back later
          </button>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(DeviceGate), { ssr: false });
