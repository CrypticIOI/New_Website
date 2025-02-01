export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#818589] via-[#9a9ea3] to-[#818589] opacity-50"
        style={{
          animation: "gradient 15s ease infinite",
          backgroundSize: "400% 400%",
        }}
      />
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}