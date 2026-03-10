import { useState, useRef, MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MotionStyle } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import { Clock, User, ArrowRight, Star } from "lucide-react";

export interface SpotlightCourse {
  id: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  price: string;
}

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItem}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className={`relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] group ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 } as MotionStyle}
      >
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            left: springX,
            top: springY,
            x: "-50%",
            y: "-50%",
            background: "radial-gradient(circle, rgba(88,166,255,0.15) 0%, rgba(88,166,255,0.05) 40%, transparent 70%)",
          }}
        />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

const demoCourses: SpotlightCourse[] = [
  { id: "sc-1", title: "Deep Learning & Neural Networks: Zero to Mastery", category: "Artificial Intelligence", instructor: "Dr. Arjun Mehta", duration: "42 hrs", difficulty: "Advanced", rating: 4.9, price: "₹4,999" },
  { id: "sc-2", title: "Full-Stack Web Development with Next.js & TypeScript", category: "Full Stack Engineering", instructor: "Priya Sharma", duration: "36 hrs", difficulty: "Intermediate", rating: 4.8, price: "₹3,499" },
  { id: "sc-3", title: "Machine Learning with Python & Scikit-Learn", category: "Machine Learning", instructor: "Rohan Gupta", duration: "28 hrs", difficulty: "Beginner", rating: 4.7, price: "₹2,999" },
  { id: "sc-4", title: "Advanced Cybersecurity & Ethical Hacking", category: "Cybersecurity", instructor: "Kavita Nair", duration: "32 hrs", difficulty: "Advanced", rating: 4.8, price: "₹4,499" },
  { id: "sc-5", title: "Data Structures & Algorithms in Java", category: "DSA & Algorithms", instructor: "Anil Verma", duration: "24 hrs", difficulty: "Intermediate", rating: 4.6, price: "₹2,499" },
  { id: "sc-6", title: "Blockchain Development with Solidity & Web3", category: "Blockchain Development", instructor: "Vikram Patel", duration: "30 hrs", difficulty: "Advanced", rating: 4.7, price: "₹3,999" },
];

const difficultyColors: Record<string, string> = {
  Beginner: "text-[var(--secondary)]",
  Intermediate: "text-yellow-500",
  Advanced: "text-red-400",
};

const categoryBadgeColors: Record<string, string> = {
  "Artificial Intelligence": "bg-blue-500/10 text-blue-400",
  "Full Stack Engineering": "bg-green-500/10 text-green-400",
  "Machine Learning": "bg-cyan-500/10 text-cyan-400",
  Cybersecurity: "bg-red-500/10 text-red-400",
  "DSA & Algorithms": "bg-teal-500/10 text-teal-400",
  "Blockchain Development": "bg-amber-500/10 text-amber-400",
};

export default function SpotlightHoverCards() {
  return (
    <section id="spotlight-courses" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">Featured Courses</p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Explore Our <span className="text-[var(--primary)]">Spotlight</span> Courses
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Hover over any card to see the spotlight effect — premium courses crafted by industry veterans.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {demoCourses.map((course) => (
            <SpotlightCard key={course.id}>
              <div className="p-5">
                <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-md mb-3 ${categoryBadgeColors[course.category] ?? "bg-gray-500/10 text-gray-400"}`}>
                  {course.category}
                </span>
                <h3 className="font-semibold text-[var(--foreground)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">{course.title}</h3>
                <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-3">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {course.instructor}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-2 py-0.5 text-xs rounded-md border border-[var(--border)] ${difficultyColors[course.difficulty] ?? ""}`}>{course.difficulty}</span>
                  <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />{course.rating}</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-lg font-bold text-[var(--foreground)]">{course.price}</span>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:underline">Enroll <ArrowRight className="w-3 h-3" /></button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
