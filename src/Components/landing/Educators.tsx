import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import { Linkedin, Briefcase, Clock } from "lucide-react";

interface Educator {
  id: number;
  name: string;
  expertise: string;
  role: string;
  yearsExperience: number;
  company: string;
  photo: string;
  linkedin: string;
  bio: string;
}

export default function Educators() {
  const [educators, setEducators] = useState<Educator[]>([]);

  useEffect(() => {
    fetch("/api/educators")
      .then((res) => res.json())
      .then(setEducators)
      .catch(() => {});
  }, []);

  return (
    <section id="educators" className="py-24">
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

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {educators.map((educator) => (
            <motion.div
              key={educator.id}
              variants={staggerItem}
              className="group relative glass-card rounded-xl p-6 hover:border-[var(--primary)]/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0 text-lg font-bold text-[var(--primary)]">
                  {educator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {educator.name}
                  </h3>
                  <p className="text-sm text-[var(--primary)] font-medium">
                    {educator.role}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[var(--muted-foreground)] mb-4 leading-relaxed">
                {educator.bio}
              </p>

              <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  {educator.expertise}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {educator.yearsExperience}+ years
                </span>
              </div>

              <div className="absolute inset-0 rounded-xl bg-[var(--card)]/95 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-3 text-xl font-bold text-[var(--primary)]">
                  {educator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">
                  {educator.name}
                </h3>
                <p className="text-sm text-[var(--primary)] mb-3">{educator.role}</p>
                <a
                  href={educator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
