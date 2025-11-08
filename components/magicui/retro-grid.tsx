"use client";

import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
}

export function RetroGrid({ className, angle = 65 }: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden opacity-80 perspective-[200px]",
        className,
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 transform-[rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",
            "absolute inset-0 bg-repeat bg-size-[60px_60px] h-[300vh] ml-[-50%] origin-[100%_0_0] w-[600vw]",
            // Light styles
            "bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_2px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.6)_2px,transparent_0)]",
            // Dark styles
            "dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_2px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.5)_2px,transparent_0)]",
          )}
        />
      </div>

      {/* Gradient overlay for fade effect */}
      <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent dark:from-black" />

      <style jsx>{`
        @keyframes grid {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(-50% + 60px));
          }
        }

        .animate-grid {
          animation: grid 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
