import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import { Calendar, Users, ArrowRight, AlertCircle } from "lucide-react";

interface LiveCourse {
  id: string;
  title: string;
  instructor: string;
  startDate: string;
  seatsRemaining: number;
  totalSeats: number;
  price: string;
}

export default function LiveCourses() {
  const [courses, setCourses] = useState<LiveCourse[]>([]);

  useEffect(() => {
    fetch("/api/live-courses")
      .then((res) => res.json())
      .then(setCourses)
      .catch(() => {});
  }, []);

  return (
    <section id="live-cohorts" className="py-24 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Live <span className="text-[var(--primary)]">Cohorts</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Join instructor-led live sessions with real-time mentorship and peer learning.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl p-6 relative overflow-hidden"
            >
              {course.seatsRemaining < 10 && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/10 text-red-500 text-xs font-medium">
                  <AlertCircle className="w-3 h-3" />
                  Limited Seats
                </div>
              )}
              <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2 pr-24">
                {course.title}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                by {course.instructor}
              </p>
              <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)] mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {course.startDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {course.seatsRemaining}/{course.totalSeats} seats
                </span>
              </div>
              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-[var(--primary)] rounded-full transition-all"
                  style={{ width: `${((course.totalSeats - course.seatsRemaining) / course.totalSeats) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[var(--foreground)]">{course.price}</span>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium hover:opacity-90 transition-opacity">
                  Enroll Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
