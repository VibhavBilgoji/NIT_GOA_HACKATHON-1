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
        height: "100vh",
        zIndex: 10,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <LaserFlow
        verticalBeamOffset={-0.45}
        horizontalBeamOffset={0.0}
        color="#00d9ff"
        verticalSizing={4.0}
        horizontalSizing={1.5}
        fogIntensity={0.8}
        wispDensity={1.5}
        flowSpeed={0.3}
        fogFallSpeed={1.0}
        wispIntensity={8.0}
      />
    </div>
  );
}
