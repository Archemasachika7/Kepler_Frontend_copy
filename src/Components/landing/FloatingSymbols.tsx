import { useEffect, useState } from "react";

const symbols = [
  "{ }",
  "<>",
  "</>",
  "function()",
  "console.log()",
  "SELECT *",
  "import",
  "=>",
  "async",
  "await",
  "npm run",
  "git push",
  "python",
  "class",
  "return",
];

interface FloatingItem {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
}

export default function FloatingSymbols() {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const generated: FloatingItem[] = symbols.map((text, i) => ({
      id: i,
      text,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 10 + Math.random() * 4,
      speed: 0.02 + Math.random() * 0.03,
      opacity: 0.06 + Math.random() * 0.08,
      rotation: Math.random() * 30 - 15,
    }));
    setItems(generated);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isDark = document.documentElement.classList.contains("dark");
    if (!isDark) return;

    let animationId: number;
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          y: item.y - item.speed * delta * 20 < -5
            ? 105
            : item.y - item.speed * delta * 20,
          rotation:
            item.rotation + Math.sin(time / 3000 + item.id) * 0.02,
        }))
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute font-mono text-[var(--primary)] select-none whitespace-nowrap"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            transform: `rotate(${item.rotation}deg)`,
            transition: "top 0.1s linear",
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
