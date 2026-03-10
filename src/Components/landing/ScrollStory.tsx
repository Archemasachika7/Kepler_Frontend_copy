import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Wrench, Cpu, Rocket } from "lucide-react";

const steps = [
  { number: "01", title: "Learn the Fundamentals", description: "Learn the fundamentals of modern software engineering. Build a strong foundation in algorithms, data structures, and system design.", icon: BookOpen },
  { number: "02", title: "Build Real-World Projects", description: "Build real-world projects that matter. From AI chatbots to blockchain DApps — create software that solves actual problems.", icon: Wrench },
  { number: "03", title: "Master Industry Tools", description: "Master industry tools and technologies. Git, Docker, AWS, CI/CD — the same tools used by engineers at top companies.", icon: Cpu },
  { number: "04", title: "Get Hired", description: "Get hired by top companies. Interview preparation, portfolio reviews, and direct connections to 300+ hiring partners.", icon: Rocket },
];

function StoryStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="relative flex items-start gap-6"
    >
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isInView ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "bg-[var(--muted)] text-[var(--muted-foreground)]"} transition-colors duration-500`}>
          <step.icon className="w-5 h-5" />
        </div>
        {index < steps.length - 1 && <div className="w-px h-20 bg-[var(--border)] mt-2" />}
      </div>
      <div className="pb-12">
        <span className="text-xs font-mono text-[var(--primary)] font-semibold mb-1 block">STEP {step.number}</span>
        <h3 className="text-[20px] font-medium text-[var(--foreground)] mb-2">{step.title}</h3>
        <p className="text-[var(--muted-foreground)] leading-relaxed max-w-md">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function ScrollStory() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">Your Journey</p>
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
            From <span className="text-[var(--primary)]">Beginner</span> to <span className="text-[var(--primary)]">Hired</span>
          </h2>
        </div>
        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (<StoryStep key={step.number} step={step} index={index} />))}
        </div>
      </div>
    </section>
  );
}
