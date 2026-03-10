import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import { ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Projects Built by <span className="text-[var(--primary)]">Students</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Real projects built during our courses — portfolio-ready from day one.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl p-6 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {project.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors flex-shrink-0" />
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-xs rounded-md border border-[var(--border)] text-[var(--muted-foreground)]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
