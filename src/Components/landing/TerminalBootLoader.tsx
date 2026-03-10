import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootLine {
  text: string;
  status?: string;
  statusColor?: string;
  delay: number;
}

const bootSequence: BootLine[] = [
  {
    text: "> initializing Kepler_Core...",
    status: "[OK]",
    statusColor: "text-[#2EA043]",
    delay: 400,
  },
  {
    text: "> loading neural_engine v3.2.1...",
    status: "[OK]",
    statusColor: "text-[#2EA043]",
    delay: 500,
  },
  {
    text: "> compiling curriculum_modules...",
    status: "[OK]",
    statusColor: "text-[#2EA043]",
    delay: 600,
  },
  {
    text: "> connecting to mentor_network...",
    status: "[OK]",
    statusColor: "text-[#2EA043]",
    delay: 450,
  },
  {
    text: "> establishing secure_link...",
    status: "[OK]",
    statusColor: "text-[#2EA043]",
    delay: 350,
  },
  {
    text: "> system ready.",
    status: "[LAUNCH]",
    statusColor: "text-[#58A6FF]",
    delay: 600,
  },
];

const HOLD_AFTER_COMPLETE = 600;

export default function TerminalBootLoader() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isBooting, setIsBooting] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const runBoot = useCallback(() => {
    let cumulativeDelay = 300;

    bootSequence.forEach((line, index) => {
      cumulativeDelay += line.delay;

      setTimeout(() => {
        setVisibleLines(index + 1);
      }, cumulativeDelay);
    });

    cumulativeDelay += HOLD_AFTER_COMPLETE;
    setTimeout(() => setIsBooting(false), cumulativeDelay);
  }, []);

  useEffect(() => {
    runBoot();
  }, [runBoot]);

  const handleExitComplete = () => setIsDone(true);

  if (isDone) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isBooting && (
        <motion.div
          key="terminal-boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D1117]"
        >
          <div className="w-full max-w-2xl mx-4">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] rounded-t-xl border border-white/10 border-b-0">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-[#8B949E] font-mono">
                kepler_core — bash
              </span>
            </div>

            <div className="bg-[#0D1117] border border-white/10 border-t-0 rounded-b-xl p-6 font-mono text-sm min-h-[260px]">
              {bootSequence.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-2 mb-1.5 leading-6"
                >
                  <span className="text-[#E6EDF3]">{line.text}</span>
                  {line.status && (
                    <span className={`${line.statusColor ?? "text-[#8B949E]"}`}>
                      {line.status}
                    </span>
                  )}
                </motion.div>
              ))}

              {visibleLines < bootSequence.length && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[#8B949E]">&gt;</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.6,
                    }}
                    className="inline-block w-2 h-4 bg-[#58A6FF]"
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
