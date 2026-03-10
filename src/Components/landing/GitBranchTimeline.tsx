import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Code2, Cpu, Rocket } from "lucide-react";
import { FadeIn } from "./MotionWrappers";

interface JourneyStep {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  branch: string;
  color: string;
  skills: string[];
}

const journeySteps: JourneyStep[] = [
  {
    id: "step-1",
    icon: BookOpen,
    title: "Foundations",
    description: "Master programming fundamentals, data structures, and algorithmic thinking to build a rock-solid base.",
    branch: "main",
    color: "#58a6ff",
    skills: ["Python", "JavaScript", "Git", "Data Structures"],
  },
  {
    id: "step-2",
    icon: Code2,
    title: "Build & Ship",
    description: "Learn full-stack development, build production-grade projects, and deploy to the cloud.",
    branch: "feature/fullstack",
    color: "#3fb950",
    skills: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    id: "step-3",
    icon: Cpu,
    title: "Specialize",
    description: "Deep-dive into AI/ML, cybersecurity, or blockchain \u2014 choose a track that matches your ambition.",
    branch: "feature/specialize",
    color: "#d2a8ff",
    skills: ["TensorFlow", "PyTorch", "Solidity", "Ethical Hacking"],
  },
  {
    id: "step-4",
    icon: Rocket,
    title: "Launch Career",
    description: "Ace interviews with mock sessions, polish your portfolio, and land your dream role in tech.",
    branch: "release/career",
    color: "#f78166",
    skills: ["System Design", "DSA", "Resume", "Interviews"],
  },
];

function StepNode({ step, index }: { step: JourneyStep; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = step.icon;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      className={`relative flex items-center gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-12`}
    >
      {/* Connector dot on the timeline */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
          className="w-5 h-5 rounded-full border-[3px] border-[var(--background)]"
          style={{ backgroundColor: step.color }}
        />
      </div>

      {/* Card */}
      <div className={`md:w-[calc(50%-2rem)] w-full ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${step.color}20` }}
            >
              <Icon className="w-5 h-5" style={{ color: step.color }} />
            </div>
            <div>
              <span className="text-xs font-mono text-[var(--muted-foreground)]">{step.branch}</span>
              <h3 className="text-base font-semibold text-[var(--foreground)]">{step.title}</h3>
            </div>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mb-3">{step.description}</p>
          <div className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}>
            {step.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-xs rounded-md border border-[var(--border)] text-[var(--muted-foreground)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </motion.div>
  );
}

export default function GitBranchTimeline() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setSvgHeight(containerRef.current.scrollHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Animate the timeline path with GSAP if available
  useEffect(() => {
    const path = svgRef.current?.querySelector("path");
    if (!path) return;

    let cleanup: (() => void) | undefined;

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      });
      cleanup = () => gsap.killTweensOf(path);
    }).catch(() => {
      // GSAP not available - show the path immediately
      if (path) {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
      }
    });

    return () => cleanup?.();
  }, [svgHeight]);

  return (
    <section id="learning-journey" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Your Learning Path
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              A <span className="text-[var(--primary)]">Git-Style</span> Journey to Mastery
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Branch out, commit to learning, and merge your way into a successful tech career.
            </p>
          </div>
        </FadeIn>

        <div ref={containerRef} className="relative">
          {/* Timeline center line (SVG) */}
          <svg
            ref={svgRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-1"
            height={svgHeight || "100%"}
            viewBox={`0 0 2 ${svgHeight || 600}`}
            preserveAspectRatio="none"
          >
            <path
              d={`M1 0 L1 ${svgHeight || 600}`}
              stroke="var(--border)"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          <div className="space-y-12 md:space-y-16">
            {journeySteps.map((step, index) => (
              <StepNode key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
