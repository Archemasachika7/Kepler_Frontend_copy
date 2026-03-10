import { motion } from "framer-motion";
import { FadeIn } from "./MotionWrappers";
import { BarChart3, Code, MessageSquare, FolderGit2, Trophy } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "In-Browser IDE",
    description: "Write, compile, and run code directly in your browser with our powerful cloud IDE.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track your learning journey with detailed analytics and performance insights.",
  },
  {
    icon: MessageSquare,
    title: "AI Code Review",
    description: "Get instant feedback on your code from our AI-powered review system.",
  },
  {
    icon: FolderGit2,
    title: "Project Portfolio",
    description: "Build and showcase real-world projects that impress hiring managers.",
  },
  {
    icon: Trophy,
    title: "Coding Challenges",
    description: "Sharpen your skills with daily challenges and competitive leaderboards.",
  },
];

export default function PlatformPreview() {
  return (
    <section className="py-24 bg-[var(--muted)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Platform Features
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Everything You Need to{" "}
              <span className="text-[var(--primary)]">Succeed</span>
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)] text-lg">
              A complete learning platform designed to take you from beginner to professional developer.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FadeIn key={feature.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
