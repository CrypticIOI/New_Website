export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-[#070B14]" />

      {/* Animated nebula effects */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-indigo-900/20 animate-pulse" style={{ animationDelay: "-2s" }} />
      </div>

      {/* Star layers with different speeds */}
      <div className="star-small" />
      <div className="star-medium" />
      <div className="star-large" />

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2000px); }
        }

        .star-small,
        .star-medium,
        .star-large {
          position: absolute;
          inset: 0;
          background: transparent;
        }

        .star-small {
          box-shadow: ${generateStars(100, 1)};
          animation: float 100s linear infinite, twinkle 3s ease-in-out infinite;
        }

        .star-medium {
          box-shadow: ${generateStars(50, 2)};
          animation: float 150s linear infinite, twinkle 5s ease-in-out infinite;
          animation-delay: -1s;
        }

        .star-large {
          box-shadow: ${generateStars(25, 3)};
          animation: float 200s linear infinite, twinkle 7s ease-in-out infinite;
          animation-delay: -2s;
        }
      `}</style>
    </div>
  );
}

// Helper function to generate random star positions
function generateStars(count: number, size: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    stars.push(`${x}px ${y}px #fff`);
  }
  return stars.map(star => `${star.slice(0, -4)} ${size}px`).join(',');
}