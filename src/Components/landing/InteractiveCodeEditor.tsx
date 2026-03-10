import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Terminal, Copy, Check } from "lucide-react";
import { FadeIn } from "./MotionWrappers";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

const defaultCode = `# Welcome to Kepler Codes Interactive Editor
# Try editing and running this code!

def greet(name: str) -> str:
    """Return a personalized greeting."""
    return f"Hello, {name}! Welcome to Kepler Codes."

def fibonacci(n: int) -> list[int]:
    """Generate the first n Fibonacci numbers."""
    if n <= 0:
        return []
    sequence = [0, 1]
    for _ in range(2, n):
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

# Run the functions
print(greet("Developer"))
print(f"First 10 Fibonacci: {fibonacci(10)}")
`;

const sampleOutput = [
  "Hello, Developer! Welcome to Kepler Codes.",
  "First 10 Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
];

const languageOptions = [
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
];

function EditorLoadingFallback() {
  return (
    <div className="flex items-center justify-center h-[320px] bg-[#1e1e1e] rounded-b-xl">
      <div className="flex flex-col items-center gap-3 text-[var(--muted-foreground)]">
        <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Loading editor&hellip;</span>
      </div>
    </div>
  );
}

export default function InteractiveCodeEditor() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [language, setLanguage] = useState("python");
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowOutput(true);
    setOutput([]);

    // Simulate execution output line by line
    sampleOutput.forEach((line, i) => {
      setTimeout(() => {
        setOutput((prev) => [...prev, line]);
        if (i === sampleOutput.length - 1) {
          setIsRunning(false);
        }
      }, (i + 1) * 400);
    });
  };

  const handleReset = () => {
    setCode(defaultCode);
    setOutput([]);
    setShowOutput(false);
    setIsRunning(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-editor" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Hands-On Coding
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Code Directly in Your{" "}
              <span className="text-[var(--primary)]">Browser</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Write, edit, and experiment with code using our built-in Monaco editor — the same engine behind VS Code.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-lg">
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--muted)]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="text-xs font-mono bg-transparent text-[var(--muted-foreground)] border border-[var(--border)] rounded px-2 py-0.5 outline-none"
                  >
                    {languageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md hover:bg-[var(--accent)] text-[var(--muted-foreground)] transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-1.5 rounded-md hover:bg-[var(--accent)] text-[var(--muted-foreground)] transition-colors"
                    title="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Play className="w-3 h-3" />
                    Run
                  </button>
                </div>
              </div>

              {/* Monaco Editor */}
              <Suspense fallback={<EditorLoadingFallback />}>
                <MonacoEditor
                  height="320px"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value ?? "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    padding: { top: 12, bottom: 12 },
                    wordWrap: "on",
                    automaticLayout: true,
                  }}
                />
              </Suspense>

              {/* Output panel */}
              {showOutput && (
                <div className="border-t border-[var(--border)] bg-[var(--muted)]">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border)]">
                    <Terminal className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                    <span className="text-xs font-mono text-[var(--muted-foreground)]">Output</span>
                  </div>
                  <div className="p-4 font-mono text-sm min-h-[60px]">
                    {output.map((line, i) => (
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
