import { Code2 } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Certifications", href: "#certifications" },
    { label: "Free Resources", href: "#free-resources" },
  ],
  Company: [
    { label: "About Us", href: "/aboutus" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Community", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function LandingFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-[var(--primary)]" />
              <span className="text-lg font-semibold text-[var(--foreground)]">
                Kepler Codes
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Learn to code, build projects, and get hired. The complete platform for aspiring developers.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} Kepler Codes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              GitHub
            </a>
            <a href="#" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              Discord
            </a>
            <a href="#" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
