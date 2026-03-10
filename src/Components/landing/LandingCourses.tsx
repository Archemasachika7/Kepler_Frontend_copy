import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import { Clock, User, ArrowRight, GraduationCap } from "lucide-react";

interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  difficulty: string;
  price: string;
  image: string;
}

const categoryColors: Record<string, string> = {
  "Artificial Intelligence": "bg-blue-500/10 text-blue-500",
  "Machine Learning": "bg-cyan-500/10 text-cyan-500",
  "Cybersecurity": "bg-red-500/10 text-red-500",
  "Blockchain Development": "bg-amber-500/10 text-amber-500",
  "Full Stack Engineering": "bg-green-500/10 text-green-500",
  "Data Science": "bg-violet-500/10 text-violet-500",
  "DSA & Algorithms": "bg-teal-500/10 text-teal-500",
};

export default function LandingCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then(setCourses)
      .catch(() => {});
  }, []);

  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];
  const filtered = filter === "All" ? courses : courses.filter((c) => c.category === filter);

  return (
    <section id="courses" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Industry-Ready <span className="text-[var(--primary)]">Courses</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              From fundamentals to advanced topics — built by engineers, for engineers.
            </p>
          </div>
        </FadeIn>

        {categories.length > 1 && (
          <FadeIn delay={0.1}>
            <div className="flex gap-2 justify-center flex-wrap mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                    filter === cat
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                      : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((course) => (
            <motion.div
              key={course.id}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl overflow-hidden group"
            >
              <div className="aspect-video bg-[var(--muted)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[var(--card)] opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-[var(--primary)]" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-md mb-2 ${categoryColors[course.category] || "bg-gray-500/10 text-gray-500"}`}>
                  {course.category}
                </span>
                <h3 className="font-semibold text-[var(--foreground)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                  {course.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {course.instructor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 text-xs rounded-md border border-[var(--border)] ${
                    course.difficulty === "Beginner" ? "text-green-500" :
                    course.difficulty === "Intermediate" ? "text-yellow-500" : "text-red-500"
                  }`}>
                    {course.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[var(--foreground)]">{course.price}</span>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:underline">
                    Enroll <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
