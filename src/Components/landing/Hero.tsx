import { motion } from "framer-motion";
import { ArrowRight, Play, Terminal, Shield } from "lucide-react";
import NeuralBackground from "./NeuralBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <NeuralBackground className="opacity-30" particleCount={70} connectionDistance={110} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--muted)] text-xs font-medium text-[var(--muted-foreground)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse" />
              New cohort starting soon
            </div>

            <h1 className="text-[40px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--foreground)]">
              Become The{" "}
              <span className="text-[var(--primary)]">Software Engineer</span>
              <br />
              That Companies Want To Hire
            </h1>

            <p className="mt-6 text-base text-[var(--muted-foreground)] max-w-xl leading-relaxed">
              Master AI, Machine Learning, Cybersecurity, Blockchain, and Software
              Engineering through real-world learning.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#video-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:bg-[var(--muted)] transition-colors"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 text-sm text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]" />
                10,000+ Students
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                300+ Hiring Partners
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative glass-card rounded-xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-[var(--muted-foreground)] font-mono">kepler-learning-platform</span>
              </div>

              <div className="flex gap-1 mb-4 border-b border-[var(--border)]">
                <div className="px-3 py-1.5 text-xs font-medium text-[var(--primary)] border-b-2 border-[var(--primary)]">
                  dashboard.tsx
                </div>
                <div className="px-3 py-1.5 text-xs text-[var(--muted-foreground)]">
                  projects.tsx
                </div>
                <div className="px-3 py-1.5 text-xs text-[var(--muted-foreground)]">
                  mentor.tsx
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex gap-3">
                  <span className="text-[var(--muted-foreground)] select-none w-6 text-right">1</span>
                  <span><span className="text-[var(--primary)]">import</span> {"{"} KeplerAI {"}"} <span className="text-[var(--primary)]">from</span> <span className="text-[var(--secondary)]">'@kepler/ai'</span></span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[var(--muted-foreground)] select-none w-6 text-right">2</span>
                  <span></span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[var(--muted-foreground)] select-none w-6 text-right">3</span>
                  <span><span className="text-[var(--primary)]">const</span> mentor = <span className="text-[var(--primary)]">new</span> KeplerAI()</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[var(--muted-foreground)] select-none w-6 text-right">4</span>
                  <span><span className="text-[var(--primary)]">await</span> mentor.startSession()</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[var(--muted-foreground)] select-none w-6 text-right">5</span>
                  <span className="text-[var(--muted-foreground)]">{`// AI mentor ready ✓`}</span>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-lg glass-card shadow-lg"
              >
                <Terminal className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-xs font-medium">Live Coding</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 flex items-center gap-2 px-3 py-2 rounded-lg glass-card shadow-lg"
              >
                <Shield className="w-4 h-4 text-[var(--secondary)]" />
                <span className="text-xs font-medium">AI Mentor</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
