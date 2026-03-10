export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[var(--background)]" />
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--primary)] blur-[160px] opacity-[0.07]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--secondary)] blur-[140px] opacity-[0.05]" />
        <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] rounded-full bg-[var(--accent)] blur-[120px] opacity-[0.04]" />
      </div>
    </div>
  );
}
