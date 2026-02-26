export default function SkeletonCard() {
  return (
    <div
      className="card skeleton"
      style={{
        height: "120px",
        animation: "pulse 1.5s infinite ease-in-out",
        background: "#1a1a1a",
        opacity: 0.6,
      }}
    />
  );
}