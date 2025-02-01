export function AnimatedBackground() {
  // Generate star positions once when component mounts
  const generateStarPositions = (count: number, size: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      stars.push(`${x}px ${y}px rgba(255, 255, 255, 0.7)`);
    }
    return stars.join(', ');
  };

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        '--star-small': generateStarPositions(50, 1),
        '--star-medium': generateStarPositions(25, 1.5),
        '--star-large': generateStarPositions(15, 2),
      } as React.CSSProperties}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-[#070B14]" />

      {/* Animated nebula effects */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 animate-pulse" 
          style={{ animationDuration: '4s' }} 
        />
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-indigo-900/10 animate-pulse" 
          style={{ animationDuration: '5s', animationDelay: '-2s' }} 
        />
      </div>

      {/* Star layers */}
      <div className="star-small" />
      <div className="star-medium" />
      <div className="star-large" />
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.1; }
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
          box-shadow: var(--star-small);
          animation: float 150s linear infinite, twinkle 4s ease-in-out infinite;
        }

        .star-medium {
          box-shadow: var(--star-medium);
          animation: float 200s linear infinite, twinkle 6s ease-in-out infinite;
          animation-delay: -2s;
        }

        .star-large {
          box-shadow: var(--star-large);
          animation: float 250s linear infinite, twinkle 8s ease-in-out infinite;
          animation-delay: -4s;
        }
      `}</style>
    </div>
  );
}