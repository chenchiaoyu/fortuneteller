export default function EnergyBar({ level, color }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: i <= level ? color : "rgba(255,255,255,0.1)",
          transition: "all 0.3s"
        }} />
      ))}
    </div>
  );
}
