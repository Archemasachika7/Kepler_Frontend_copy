import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./MotionWrappers";
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react";

interface Educator {
  id: number;
  name: string;
  role: string;
  company: string;
  photo: string;
  linkedin: string;
}

const featuredEducators: Educator[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Senior Software Engineer",
    company: "Google",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "ML Research Scientist",
    company: "Microsoft",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Tech Lead",
    company: "Amazon",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "Full Stack Developer",
    company: "Meta",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Data Science Lead",
    company: "Netflix",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Ananya Gupta",
    role: "Backend Architect",
    company: "Apple",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
  },
];

const getPositionStyles = (position: number, total: number) => {
  // Carousel positions: far-left, left, center, right, far-right, hidden
  const positions: Record<string, { x: number; scale: number; zIndex: number; opacity: number; rotateY: number }> = {
    "center": { x: 0, scale: 1, zIndex: 30, opacity: 1, rotateY: 0 },
    "right": { x: 280, scale: 0.8, zIndex: 20, opacity: 0.7, rotateY: -25 },
    "left": { x: -280, scale: 0.8, zIndex: 20, opacity: 0.7, rotateY: 25 },
    "far-right": { x: 480, scale: 0.6, zIndex: 10, opacity: 0.4, rotateY: -40 },
    "far-left": { x: -480, scale: 0.6, zIndex: 10, opacity: 0.4, rotateY: 40 },
    "hidden": { x: 0, scale: 0.4, zIndex: 0, opacity: 0, rotateY: 0 },
  };

  const positionMap: string[] = [];
  for (let i = 0; i < total; i++) {
    if (i === 0) positionMap.push("center");
    else if (i === 1) positionMap.push("right");
    else if (i === total - 1) positionMap.push("left");
    else if (i === 2) positionMap.push("far-right");
    else if (i === total - 2) positionMap.push("far-left");
    else positionMap.push("hidden");
  }

  return positions[positionMap[position] || "hidden"];
};

export default function Educators() {
  const [educators] = useState<Educator[]>(featuredEducators);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const total = educators.length;

  const rotateRight = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const rotateLeft = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(rotateRight, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, rotateRight]);

  const getRelativePosition = (index: number) => {
    const diff = (index - activeIndex + total) % total;
    return diff;
  };

  return (
    <section id="educators" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Learn From The Best
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Industry <span className="text-[var(--primary)]">Educators</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Our educators come from top tech companies with years of real-world experience.
            </p>
          </div>
        </FadeIn>

        {/* 3D Carousel */}
        <div
          className="relative h-[420px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="sync">
            {educators.map((educator, index) => {
              const relPos = getRelativePosition(index);
              const styles = getPositionStyles(relPos, total);

              return (
                <motion.div
                  key={educator.id}
                  className="absolute w-[260px]"
                  animate={{
                    x: styles.x,
                    scale: styles.scale,
                    rotateY: styles.rotateY,
                    opacity: styles.opacity,
                    zIndex: styles.zIndex,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="glass-card rounded-2xl p-6 text-center border border-[var(--border)] bg-[var(--card)] shadow-xl">
                    {/* Educator Photo */}
                    <div className="relative mx-auto w-28 h-28 mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-600 p-[3px]">
                        <img
                          src={educator.photo}
                          alt={educator.name}
                          className="w-full h-full rounded-full object-cover bg-[var(--card)]"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(educator.name)}&size=300&background=6366f1&color=fff`;
                          }}
                        />
                      </div>
                    </div>

                    {/* Educator Info */}
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">
                      {educator.name}
                    </h3>
                    <p className="text-sm font-medium text-[var(--primary)] mb-1">
                      {educator.role}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mb-4">
                      {educator.company}
                    </p>

                    {/* LinkedIn Button */}
                    <a
                      href={educator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all duration-200"
                    >
                      <Linkedin className="w-4 h-4" />
                      Connect
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={rotateLeft}
            className="absolute left-4 sm:left-8 z-40 p-3 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] shadow-lg hover:bg-[var(--muted)] transition-colors"
            aria-label="Previous educator"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={rotateRight}
            className="absolute right-4 sm:right-8 z-40 p-3 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] shadow-lg hover:bg-[var(--muted)] transition-colors"
            aria-label="Next educator"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {educators.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-[var(--primary)]"
                  : "bg-[var(--muted-foreground)]/30 hover:bg-[var(--muted-foreground)]/60"
              }`}
              aria-label={`Go to educator ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
