export default function SpotlightCursor() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300"
      style={{
        background: "rgba(96,165,250,0.015)",
      }}
    />
  );
}
