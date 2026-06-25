import { ENERGY_CONFIG } from '../data/weeks';

export default function WeekCard({ week, isSelected, onClick, isMobile }) {
  const config = ENERGY_CONFIG[week.energy];
  return (
    <div onClick={onClick} style={{
      cursor: "pointer",
      padding: isMobile ? "14px 12px" : "12px 14px",
      borderRadius: 10,
      border: `1px solid ${isSelected ? config.color : "rgba(255,255,255,0.07)"}`,
      background: isSelected ? config.bg : "rgba(255,255,255,0.02)",
      transition: "all 0.2s",
      marginBottom: isMobile ? 10 : 8,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }}>
      {/* Row 1: week num + energy badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
          W{week.id} · {week.start}–{week.end}
        </span>
        <span style={{
          fontSize: 10, color: config.color,
          background: config.bg, padding: "2px 7px", borderRadius: 4
        }}>
          {config.icon} {config.label}
        </span>
      </div>

      {/* Row 2: title */}
      <div style={{
        fontSize: isMobile ? 14 : 13,
        color: isSelected ? "#fff" : "rgba(255,255,255,0.82)",
        fontWeight: 600, lineHeight: 1.45
      }}>
        {week.title}
      </div>

      {/* Row 3: tags */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {week.tags.map(t => (
          <span key={t} style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.38)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "1px 6px", borderRadius: 4
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Mobile: show focus hint */}
      {isMobile && (
        <div style={{
          fontSize: 11, color: config.color,
          marginTop: 2, opacity: 0.8
        }}>
          聚焦：{week.focus} →
        </div>
      )}
    </div>
  );
}
