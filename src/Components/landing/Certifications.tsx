import { FadeIn } from "./MotionWrappers";
import { Award, Share2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const certifications = [
  {
    title: "Full Stack Developer",
    description: "Master front-end, back-end, databases, and deployment. Build and ship complete web applications.",
    skills: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    duration: "6 months",
    projects: 12,
  },
  {
    title: "AI & Machine Learning",
    description: "Learn ML fundamentals, deep learning, NLP, and computer vision with real-world datasets.",
    skills: ["Python", "TensorFlow", "PyTorch", "Pandas", "MLOps"],
    duration: "8 months",
    projects: 10,
  },
  {
    title: "Cloud & DevOps",
    description: "Master cloud infrastructure, CI/CD pipelines, containerization, and monitoring at scale.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    duration: "5 months",
    projects: 8,
  },
];

export default function Certifications() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Certifications
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Industry-Recognized{" "}
              <span className="text-[var(--primary)]">Certifications</span>
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)] text-lg">
              Earn certifications that prove your skills and open doors to top opportunities.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <FadeIn key={cert.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-colors h-full flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-lg font-medium text-[var(--foreground)]">
                    {cert.title}
                  </h3>
                </div>

                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{cert.projects} projects</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{cert.duration}</span>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
