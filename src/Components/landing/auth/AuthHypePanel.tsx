import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeSnippets = [
  {
    title: "binary_search.py",
    lines: [
      { text: "def binary_search(arr, target):", color: "text-blue-400" },
      { text: "    lo, hi = 0, len(arr) - 1", color: "text-zinc-300" },
      { text: "    while lo <= hi:", color: "text-purple-400" },
      { text: "        mid = (lo + hi) // 2", color: "text-zinc-300" },
      { text: "        if arr[mid] == target:", color: "text-purple-400" },
      { text: "            return mid", color: "text-green-400" },
      { text: "        elif arr[mid] < target:", color: "text-purple-400" },
      { text: "            lo = mid + 1", color: "text-zinc-300" },
      { text: "        else:", color: "text-purple-400" },
      { text: "            hi = mid - 1", color: "text-zinc-300" },
      { text: "    return -1", color: "text-red-400" },
      { text: "", color: "" },
      { text: "# O(log n) — Kepler DSA Track", color: "text-zinc-600" },
    ],
  },
  {
    title: "neural_net.py",
    lines: [
      { text: "import torch", color: "text-blue-400" },
      { text: "import torch.nn as nn", color: "text-blue-400" },
      { text: "", color: "" },
      { text: "class KeplerNet(nn.Module):", color: "text-yellow-400" },
      { text: "    def __init__(self):", color: "text-blue-400" },
      { text: "        super().__init__()", color: "text-zinc-300" },
      { text: "        self.layers = nn.Sequential(", color: "text-zinc-300" },
      { text: "            nn.Linear(784, 256),", color: "text-zinc-300" },
      { text: "            nn.ReLU(),", color: "text-green-400" },
      { text: "            nn.Linear(256, 10),", color: "text-zinc-300" },
      { text: "        )", color: "text-zinc-300" },
      { text: "", color: "" },
      { text: "# Kepler AI Track", color: "text-zinc-600" },
    ],
  },
  {
    title: "api_server.ts",
    lines: [
      { text: "import express from 'express';", color: "text-blue-400" },
      { text: "import { auth } from './middleware';", color: "text-blue-400" },
      { text: "", color: "" },
      { text: "const app = express();", color: "text-zinc-300" },
      { text: "", color: "" },
      { text: "app.get('/api/v1/data', auth, async (req, res) => {", color: "text-yellow-400" },
      { text: "  const data = await fetchData(req.user);", color: "text-zinc-300" },
      { text: "  res.json({ success: true, data });", color: "text-green-400" },
      { text: "});", color: "text-zinc-300" },
      { text: "", color: "" },
      { text: "app.listen(3000, () => {", color: "text-yellow-400" },
      { text: "  console.log('Server running on :3000');", color: "text-green-400" },
      { text: "});", color: "text-zinc-300" },
    ],
  },
];

const terminalLines = [
  { text: "$ kepler init --track=fullstack", delay: 0 },
  { text: "> Initializing project workspace...", delay: 400 },
  { text: "> Installing dependencies... done.", delay: 800 },
  { text: "> Compiling modules...", delay: 1200 },
  { text: "  ✓ core_engine loaded", delay: 1600 },
  { text: "  ✓ neural_network ready", delay: 1900 },
  { text: "  ✓ test_suite configured", delay: 2200 },
  { text: "> All systems operational.", delay: 2600 },
  { text: "", delay: 3000 },
  { text: "$ kepler run --mode=learn", delay: 3200 },
  { text: "> Launching learning environment...", delay: 3600 },
  { text: "> Welcome to KEPLER CODES.", delay: 4000 },
];

export default function AuthHypePanel() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [terminalVisible, setTerminalVisible] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setVisibleLines(0);
    const snippet = codeSnippets[currentSnippet];
    let lineIndex = 0;

    intervalRef.current = setInterval(() => {
      lineIndex++;
      setVisibleLines(lineIndex);
      if (lineIndex >= snippet.lines.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 120);

    const cycleTimeout = setTimeout(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(cycleTimeout);
    };
  }, [currentSnippet]);

  useEffect(() => {
    const timeouts = terminalLines.map((line, i) =>
      setTimeout(() => {
        setTerminalVisible((prev) => [...prev, i]);
      }, line.delay)
    );

    const resetTimeout = setTimeout(() => {
      setTerminalVisible([]);
      const reTimeouts = terminalLines.map((line, i) =>
        setTimeout(() => {
          setTerminalVisible((prev) => [...prev, i]);
        }, line.delay)
      );
      return () => reTimeouts.forEach(clearTimeout);
    }, 8000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(resetTimeout);
    };
  }, []);

  const snippet = codeSnippets[currentSnippet];

  return (
    <div className="relative hidden lg:flex flex-col justify-center items-center w-full h-full bg-[#0a0a0f] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,165,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] animate-pulse-glow" />

      {/* Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-8 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">
          KEPLER <span className="text-blue-400">CODES</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-500 font-mono">
          The Engineering Ecosystem
        </p>
      </motion.div>

      {/* Code editor window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 w-[85%] max-w-md"
      >
        <div className="rounded-xl border border-white/[0.08] bg-[#111118] shadow-2xl overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0d0d14]">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={snippet.title}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-2 text-xs text-zinc-500 font-mono"
              >
                {snippet.title}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Code content */}
          <div className="p-4 font-mono text-[13px] leading-relaxed min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSnippet}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {snippet.lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: i < visibleLines ? 1 : 0,
                      x: i < visibleLines ? 0 : -10,
                    }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <span className="w-6 text-right mr-4 text-zinc-700 select-none text-xs">
                      {i + 1}
                    </span>
                    <span className={line.color}>{line.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Terminal output */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 w-[85%] max-w-md mt-4"
      >
        <div className="rounded-lg border border-white/[0.06] bg-[#0d0d14] p-3 font-mono text-[11px] leading-relaxed min-h-[120px]">
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: terminalVisible.includes(i) ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className={
                line.text.startsWith("  ✓")
                  ? "text-emerald-400"
                  : line.text.startsWith("$")
                    ? "text-blue-400"
                    : "text-zinc-500"
              }
            >
              {line.text}
            </motion.div>
          ))}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-2 h-4 bg-blue-400 ml-0.5 align-middle"
          />
        </div>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 mt-8 text-xs text-zinc-600 font-mono"
      >
        10,000+ developers building the future
      </motion.p>
    </div>
  );
}
