import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import { Brain, Rocket, GraduationCap, Briefcase, Code2, Users } from "lucide-react";

const reasons = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Our AI mentor adapts to your learning style, providing personalized guidance and instant feedback on every line of code you write.",
  },
  {
    icon: Code2,
    title: "Learn by Building",
    description: "Don't just watch tutorials — build real projects. From day one, you'll be writing code that solves actual problems.",
  },
  {
    icon: Rocket,
    title: "Industry-Ready Skills",
    description: "Master the exact tools and technologies that top companies use. Git, Docker, AWS, CI/CD pipelines, and more.",
  },
  {
    icon: Users,
    title: "Community of Builders",
    description: "Join 50,000+ developers who learn together, share projects, and help each other grow through code reviews and pair programming.",
  },
  {
    icon: GraduationCap,
    title: "Structured Curriculum",
    description: "Follow a carefully designed learning path that takes you from fundamentals to advanced topics in a logical progression.",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description: "Get resume reviews, mock interviews, and direct connections to our network of 300+ hiring partners worldwide.",
  },
];

export default function WhyKeplerCodes() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Why Kepler Codes
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Why Developers Choose{" "}
              <span className="text-[var(--primary)]">Kepler Codes</span>
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)] text-lg">
              We're not just another coding platform. Here's what makes us different.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={staggerItem}
              className="group relative p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--primary)]/20 transition-colors">
                <reason.icon className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
