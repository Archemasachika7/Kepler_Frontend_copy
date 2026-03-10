import { FadeIn } from "./MotionWrappers";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import NeuralBackground from "./NeuralBackground";

const chatMessages = [
  {
    role: "user" as const,
    message: "How do I reverse a linked list?",
  },
  {
    role: "ai" as const,
    message: "Great question! There are two common approaches to reverse a linked list: iterative and recursive. Let me walk you through the iterative approach first, as it's more intuitive.",
  },
  {
    role: "ai" as const,
    message: "The idea is to use three pointers: prev, current, and next. You iterate through the list, reversing the direction of each node's pointer. Here's the Python code:",
  },
  {
    role: "user" as const,
    message: "Can you show me the time complexity?",
  },
  {
    role: "ai" as const,
    message: "The iterative approach has O(n) time complexity and O(1) space complexity, making it optimal. The recursive approach is also O(n) time but uses O(n) space due to the call stack.",
  },
];

export default function AIMentor() {
  return (
    <section className="py-24 relative overflow-hidden">
      <NeuralBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              AI Mentor
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Your Personal{" "}
              <span className="text-[var(--primary)]">AI Coding Mentor</span>
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)] text-lg">
              Get instant help, explanations, and code reviews from our AI mentor — available 24/7 to guide your learning journey.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-lg">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--muted)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    Kepler AI Mentor
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-[var(--muted-foreground)]">Online</span>
                  </div>
                </div>
                <Sparkles className="w-4 h-4 text-[var(--primary)] ml-auto" />
              </div>

              {/* Chat messages */}
              <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3, duration: 0.4 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                          : "bg-[var(--muted)] text-[var(--foreground)]"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat input */}
              <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask your AI mentor anything..."
                    className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]"
                    readOnly
                  />
                  <button className="p-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
