import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UTechLanding() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // Narrator effect after loading
  useEffect(() => {
    if (!loading) {
      const message = new SpeechSynthesisUtterance(
        "Welcome to U.Tech Incubators. A new era of hatching begins here. Smart, secure, and always in your hands — anywhere in the world."
      );
      message.rate = 1;
      message.pitch = 1;
      window.speechSynthesis.speak(message);
    }
  }, [loading]);

  const playNarrator = () => {
    const message = new SpeechSynthesisUtterance(
      "Welcome to U.Tech Incubators. A new era of hatching begins here. Smart, secure, and always in your hands — anywhere in the world."
    );
    message.rate = 1;
    message.pitch = 1;
    window.speechSynthesis.speak(message);
  };

  return (
    <div className="min-h-screen font-sans bg-yellow-400 text-gray-900 overflow-hidden relative">
      <TechLaunchBackground />

      {/* Loader (three gears) */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-yellow-500"
          >
            <div className="text-center">
              <GearsLoader />
              <p className="mt-6 text-lg">Launching U.Tech Incubators — UMAR ASUMAR</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <main className="relative z-10 container mx-auto px-6 py-16">
          <header className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight">U.Tech Incubators</h1>
            <p className="mt-2 text-lg opacity-80">Smart. Secure. Global. The incubator of the future.</p>
            <p className="mt-1 text-sm opacity-70">Owner: <span className="font-semibold">UMAR ASUMAR</span></p>
          </header>

          <section className="mt-8 text-center">
            <button
              onClick={playNarrator}
              className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800"
            >
              Replay Narrator
            </button>
          </section>

          <section className="mt-16 text-center">
            <h2 className="text-3xl font-bold">Contact</h2>
            <p className="mt-3">Phone: <span className="font-mono">0546503323</span> / <span className="font-mono">0506911295</span></p>
          </section>

          <footer className="mt-16 text-center opacity-80 text-sm">© {new Date().getFullYear()} U.Tech Incubators — UMAR ASUMAR</footer>
        </main>
      )}
    </div>
  );
}

function GearsLoader() {
  return (
    <div className="flex items-center justify-center gap-6" style={{ width: "7cm", height: "7cm" }}>
      <svg width="220" height="80" viewBox="0 0 220 80" className="inline-block" aria-hidden>
        <g transform="translate(30,40)">
          <g className="gear gear-left">
            <GearSVG r={22} teeth={8} />
          </g>
        </g>

        <g transform="translate(110,40)">
          <g className="gear gear-mid">
            <GearSVG r={26} teeth={10} />
          </g>
        </g>

        <g transform="translate(190,40)">
          <g className="gear gear-right">
            <GearSVG r={20} teeth={7} />
          </g>
        </g>

        <style>{`
          .gear-left { animation: rotate-gear-ccw 2.6s linear infinite; }
          .gear-mid { animation: rotate-gear-cw 3.2s linear infinite; }
          .gear-right { animation: rotate-gear-ccw 2s linear infinite; }
          @keyframes rotate-gear-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes rotate-gear-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        `}</style>
      </svg>
    </div>
  );
}

function GearSVG({ r = 20, teeth = 8 }) {
  const toothAngle = (Math.PI * 2) / teeth;
  const innerR = r * 0.65;
  const center = { x: 30, y: 0 };

  const teethPaths = new Array(teeth).fill(0).map((_, i) => {
    const angle = i * toothAngle;
    const x = center.x + Math.cos(angle) * (r - 2);
    const y = center.y + Math.sin(angle) * (r - 2);
    return <rect key={i} x={x - 3} y={y - 6} width={6} height={12} rx={1} transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`} />;
  });

  return (
    <g>
      <circle cx={center.x} cy={center.y} r={r - 4} fill="rgba(0,0,0,0.15)" stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
      <circle cx={center.x} cy={center.y} r={innerR} fill="rgba(0,0,0,0.3)" />
      {teethPaths}
      <circle cx={center.x} cy={center.y} r={innerR * 0.5} fill="rgba(0,0,0,0.15)" />
    </g>
  );
}

function TechLaunchBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-yellow-300 animate-pulse" />
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="none">
          <defs>
            <linearGradient id="techGradient" x1="0" x2="1">
              <stop offset="0%" stopColor="#facc15" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGradient)" />
          <g stroke="rgba(0,0,0,0.1)" strokeWidth="1">
            {Array.from({ length: 30 }).map((_, i) => (
              <circle key={i} cx={Math.random() * 1600} cy={Math.random() * 900} r="2" fill="black" />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
