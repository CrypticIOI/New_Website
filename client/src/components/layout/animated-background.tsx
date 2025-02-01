export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#070B14] via-[#1B2735] to-[#090D17] opacity-90"
        style={{
          animation: "gradient 15s ease infinite",
          backgroundSize: "400% 400%",
        }}
      />
      <div className="stars absolute inset-0" />
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

        .stars {
          background: transparent;
          box-shadow: 
            1px 1px white,
            2px 2px white,
            3px 3px white,
            4px 4px white,
            5px 5px white,
            6px 6px white,
            7px 7px white,
            8px 8px white,
            9px 9px white,
            10px 10px white,
            11px 11px white,
            12px 12px white,
            13px 13px white,
            14px 14px white,
            15px 15px white,
            16px 16px white,
            17px 17px white,
            18px 18px white,
            19px 19px white,
            20px 20px white;
          animation: animStar 50s linear infinite;
        }

        @keyframes animStar {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </div>
  );
}