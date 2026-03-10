import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./MotionWrappers";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need any prior coding experience?",
    answer: "No! Our curriculum starts from the very basics. Whether you've never written a line of code or you're looking to advance your skills, we have a learning path for you.",
  },
  {
    question: "How does the AI mentor work?",
    answer: "Our AI mentor analyzes your code in real-time, provides suggestions, explains concepts, and adapts to your learning pace. It's like having a senior developer available 24/7.",
  },
  {
    question: "What programming languages do you teach?",
    answer: "We cover Python, JavaScript, TypeScript, Java, C++, Go, Rust, and more. Our focus is on teaching you to think like a programmer so you can pick up any language.",
  },
  {
    question: "How long does it take to get hired?",
    answer: "On average, our students land their first tech job within 6 months of starting the Pro plan. 94% of graduates are employed within a year of completion.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your Pro subscription at any time. You'll continue to have access until the end of your billing period. No questions asked.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for Pro subscriptions. If you're not satisfied, contact us within 30 days for a full refund.",
  },
  {
    question: "Are the certifications recognized by employers?",
    answer: "Yes! Our certifications are recognized by our 300+ hiring partners. Many employers specifically look for Kepler Codes certifications when evaluating candidates.",
  },
];

function FAQItem({ faq }: { faq: (typeof faqs)[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left group"
      >
        <span className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[var(--muted-foreground)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-[var(--muted-foreground)] leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-24 bg-[var(--muted)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              FAQ
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Frequently Asked{" "}
              <span className="text-[var(--primary)]">Questions</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="max-w-2xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} faq={faq} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
