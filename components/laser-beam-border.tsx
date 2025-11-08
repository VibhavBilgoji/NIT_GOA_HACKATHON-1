"use client";

import { useEffect, useRef } from "react";

interface LaserBeamBorderProps {
  children: React.ReactNode;
  className?: string;
  beamColor?: string;
  beamWidth?: number;
  speed?: number;
  glowIntensity?: number;
}

export function LaserBeamBorder({
  children,
  className = "",
  beamColor = "rgba(168, 85, 247, 0.8)", // Purple color
  beamWidth = 2,
  speed = 2,
  glowIntensity = 20,
}: LaserBeamBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    let offset = 0;

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const perimeter = (width + height) * 2;
      const beamLength = perimeter * 0.15; // Beam takes 15% of perimeter

      // Calculate current position along perimeter
      offset = (offset + speed) % perimeter;

      // Draw the laser beam
      ctx.save();
      ctx.shadowBlur = glowIntensity;
      ctx.shadowColor = beamColor;
      ctx.strokeStyle = beamColor;
      ctx.lineWidth = beamWidth;
      ctx.lineCap = "round";

      // Calculate start and end points
      const startPos = offset;
      const endPos = (offset + beamLength) % perimeter;

      // Function to convert linear position to x,y coordinates
      const getPoint = (pos: number) => {
        if (pos < width) {
          // Top edge
          return { x: pos, y: 0 };
        } else if (pos < width + height) {
          // Right edge
          return { x: width, y: pos - width };
        } else if (pos < width * 2 + height) {
          // Bottom edge
          return { x: width - (pos - width - height), y: height };
        } else {
          // Left edge
          return { x: 0, y: height - (pos - width * 2 - height) };
        }
      };

      // Draw the beam
      ctx.beginPath();

      if (endPos > startPos) {
        // Beam doesn't wrap around
        const start = getPoint(startPos);
        ctx.moveTo(start.x, start.y);

        // Draw along the perimeter
        let currentPos = startPos;
        while (currentPos < endPos) {
          const point = getPoint(currentPos);
          ctx.lineTo(point.x, point.y);
          currentPos += 5;
        }

        const end = getPoint(endPos);
        ctx.lineTo(end.x, end.y);
      } else {
        // Beam wraps around - draw in two segments
        // First segment: from startPos to perimeter end
        const start = getPoint(startPos);
        ctx.moveTo(start.x, start.y);

        let currentPos = startPos;
        while (currentPos < perimeter) {
          const point = getPoint(currentPos);
          ctx.lineTo(point.x, point.y);
          currentPos += 5;
        }

        // Second segment: from 0 to endPos
        const restart = getPoint(0);
        ctx.moveTo(restart.x, restart.y);

        currentPos = 0;
        while (currentPos < endPos) {
          const point = getPoint(currentPos);
          ctx.lineTo(point.x, point.y);
          currentPos += 5;
        }

        const end = getPoint(endPos);
        ctx.lineTo(end.x, end.y);
      }

      ctx.stroke();

      // Add extra glow layers for intensity
      ctx.shadowBlur = glowIntensity * 2;
      ctx.stroke();

      ctx.shadowBlur = glowIntensity * 3;
      ctx.globalAlpha = 0.3;
      ctx.stroke();

      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beamColor, beamWidth, speed, glowIntensity]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ borderRadius: "inherit" }}
      />
      {children}
    </div>
  );
}
