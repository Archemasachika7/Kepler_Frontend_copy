import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import { GraduationCap, FolderGit2, Handshake, TrendingUp } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-[var(--primary)]">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: GraduationCap,
    value: 50000,
    suffix: "+",
    label: "Students Enrolled",
    description: "Learners from 120+ countries",
  },
  {
    icon: FolderGit2,
    value: 200,
    suffix: "+",
    label: "Real-World Projects",
    description: "Hands-on portfolio builders",
  },
  {
    icon: Handshake,
    value: 300,
    suffix: "+",
    label: "Hiring Partners",
    description: "Companies actively recruiting",
  },
  {
    icon: TrendingUp,
    value: 94,
    suffix: "%",
    label: "Placement Rate",
    description: "Within 6 months of completion",
  },
];

export default function Stats() {
  return (
    <section className="py-24 bg-[var(--muted)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              By the Numbers
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Trusted by{" "}
              <span className="text-[var(--primary)]">Thousands</span> of
              Developers
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-lg font-medium text-[var(--foreground)] mt-2">
                {stat.label}
              </p>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
