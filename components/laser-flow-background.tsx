"use client";

import LaserFlow from "@/components/laser-flow";

export function LaserFlowBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "60vh",
        maxHeight: "800px",
        zIndex: 10,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <LaserFlow
        verticalBeamOffset={-0.45}
        horizontalBeamOffset={0.0}
        color="#00ffff"
        verticalSizing={5.0}
        horizontalSizing={2.0}
        fogIntensity={1.5}
        wispDensity={2.0}
        flowSpeed={0.3}
        fogFallSpeed={1.2}
        wispIntensity={15.0}
        falloffStart={0.8}
      />
    </div>
  );
}
