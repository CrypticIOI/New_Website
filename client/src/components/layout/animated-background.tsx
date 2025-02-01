import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <svg
        className="w-full h-full opacity-[0.15] mix-blend-overlay"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.25"
            numOctaves="3"
            stitchTiles="stitch"
          >
            <animate
              attributeName="seed"
              from="0"
              to="100"
              dur="3s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="1" />
      </svg>
    </div>
  );
}