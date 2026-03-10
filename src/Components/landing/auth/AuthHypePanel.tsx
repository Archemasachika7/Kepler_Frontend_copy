import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, Users, BookOpen, Award } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Learning",
    description: "Personalized curriculum that adapts to your pace and style.",
  },
  {
    icon: Shield,
    title: "Industry-Ready Skills",
    description: "Learn the exact stack top companies are hiring for.",
  },
  {
    icon: Zap,
    title: "Hands-On Projects",
    description: "Build real-world projects from day one, not just tutorials.",
  },
  {
    icon: Users,
    title: "Community of 15,000+",
    description: "Collaborate with passionate developers and mentors.",
  },
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Taught by engineers from top tech companies worldwide.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description: "Earn credentials recognized by leading employers.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AuthHypePanel() {
  return (
    <div className="hidden lg:flex flex-col justify-center px-10 py-12 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--secondary)]/5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          Welcome to <span className="text-[var(--primary)]">Kepler Codes</span>
        </h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-8 max-w-sm">
          Join thousands of developers building the future. Here's what makes us different:
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--muted)]/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-[var(--primary)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--foreground)]">{feature.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{feature.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 pt-6 border-t border-[var(--border)]"
      >
        <p className="text-xs text-[var(--muted-foreground)] italic">
          "Kepler Codes transformed my career. I went from zero to a full-stack role in 6 months."
        </p>
        <p className="text-xs text-[var(--muted-foreground)] mt-2 font-medium">
          — Priya S., Software Engineer at Google
        </p>
      </motion.div>
    </div>
  );
}
