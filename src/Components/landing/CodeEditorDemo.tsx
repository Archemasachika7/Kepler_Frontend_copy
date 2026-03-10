import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Terminal, RotateCcw } from "lucide-react";
import { FadeIn } from "./MotionWrappers";

const codeLines = [
  { text: 'def fibonacci(n):', indent: 0 },
  { text: '    """Calculate the nth Fibonacci number."""', indent: 1 },
  { text: '    if n <= 1:', indent: 1 },
  { text: '        return n', indent: 2 },
  { text: '    return fibonacci(n - 1) + fibonacci(n - 2)', indent: 1 },
  { text: '', indent: 0 },
  { text: '# Test the function', indent: 0 },
  { text: 'for i in range(10):', indent: 0 },
  { text: '    print(f"F({i}) = {fibonacci(i)}")', indent: 1 },
];

const outputLines = [
  "F(0) = 0",
  "F(1) = 1",
  "F(2) = 1",
  "F(3) = 2",
  "F(4) = 3",
  "F(5) = 5",
  "F(6) = 8",
  "F(7) = 13",
  "F(8) = 21",
  "F(9) = 34",
];

export default function CodeEditorDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [showOutput, setShowOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [outputIndex, setOutputIndex] = useState(0);
  const typingInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const outputInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTyping = useCallback(() => {
    setDisplayedLines(0);
    setShowOutput(false);
    setIsRunning(false);
    setOutputIndex(0);

    if (typingInterval.current) clearInterval(typingInterval.current);
    if (outputInterval.current) clearInterval(outputInterval.current);

    let line = 0;
    typingInterval.current = setInterval(() => {
      line++;
      setDisplayedLines(line);
      if (line >= codeLines.length) {
        if (typingInterval.current) clearInterval(typingInterval.current);
      }
    }, 300);
  }, []);

  const runCode = useCallback(() => {
    if (isRunning || displayedLines < codeLines.length) return;
    setIsRunning(true);
    setShowOutput(true);
    setOutputIndex(0);

    let idx = 0;
    outputInterval.current = setInterval(() => {
      idx++;
      setOutputIndex(idx);
      if (idx >= outputLines.length) {
        if (outputInterval.current) clearInterval(outputInterval.current);
        setIsRunning(false);
      }
    }, 150);
  }, [isRunning, displayedLines]);

  const reset = useCallback(() => {
    if (typingInterval.current) clearInterval(typingInterval.current);
    if (outputInterval.current) clearInterval(outputInterval.current);
    startTyping();
  }, [startTyping]);

  useEffect(() => {
    if (isInView) {
      startTyping();
    }
    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
      if (outputInterval.current) clearInterval(outputInterval.current);
    };
  }, [isInView, startTyping]);

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Interactive Learning
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Write, Run & Learn in{" "}
              <span className="text-[var(--primary)]">Real Time</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-lg">
              {/* Editor header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-mono text-[var(--muted-foreground)] ml-2">
                    fibonacci.py
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={reset}
                    className="p-1.5 rounded-md hover:bg-[var(--accent)] text-[var(--muted-foreground)] transition-colors"
                    title="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={runCode}
                    disabled={isRunning || displayedLines < codeLines.length}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Play className="w-3 h-3" />
                    Run
                  </button>
                </div>
              </div>

              {/* Code area */}
              <div className="p-4 font-mono text-sm leading-relaxed min-h-[260px]">
                {codeLines.slice(0, displayedLines).map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 text-right mr-4 text-[var(--muted-foreground)] text-xs select-none">
                      {i + 1}
                    </span>
                    <span className="text-[var(--foreground)]">
                      {line.text}
                      {i === displayedLines - 1 && displayedLines < codeLines.length && (
                        <motion.span
                          className="inline-block w-2 h-4 bg-[var(--primary)] ml-0.5"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Output area */}
              {showOutput && (
                <div className="border-t border-[var(--border)] bg-[var(--muted)]">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border)]">
                    <Terminal className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                    <span className="text-xs font-mono text-[var(--muted-foreground)]">
                      Output
                    </span>
                  </div>
                  <div className="p-4 font-mono text-sm">
                    {outputLines.slice(0, outputIndex).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-400"
                      >
                        {line}
                      </motion.div>
                    ))}
                    {isRunning && (
                      <motion.span
                        className="inline-block w-2 h-4 bg-green-400"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
