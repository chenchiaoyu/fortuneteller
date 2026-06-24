import { ENERGY_CONFIG } from '../data/weeks';

export default function WeekCard({ week, isSelected, onClick }) {
  const config = ENERGY_CONFIG[week.energy];
  return (
    <div onClick={onClick} style={{
      cursor: "pointer",
      padding: "12px 14px",
      borderRadius: 8,
      border: `1px solid ${isSelected ? config.color : "rgba(255,255,255,0.08)"}`,
      background: isSelected ? config.bg : "rgba(255,255,255,0.03)",
      transition: "all 0.25s",
      marginBottom: 8
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginRight: 8 }}>
            W{week.id} {week.start}–{week.end}
          </span>
          <span style={{ fontSize: 10, color: config.color, background: config.bg, padding: "1px 6px", borderRadius: 3 }}>
            {config.icon} {config.label}
          </span>
        </div>
      </div>
      <div style={{ fontSize: 13, color: isSelected ? "#fff" : "rgba(255,255,255,0.75)", fontWeight: 600, lineHeight: 1.4 }}>
        {week.title}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
        {week.tags.map(t => (
          <span key={t} style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: 3 }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
