import { useState } from "react";
import { WEEKS, ENERGY_CONFIG, SYSTEM_COLORS } from "./data/weeks";
import WeekCard from "./components/WeekCard";
import DetailPanel from "./components/DetailPanel";

const CURRENT_WEEK_ID = 1; // 第1週為當前週

export default function App() {
  const [selected, setSelected] = useState(CURRENT_WEEK_ID);
  const [filter, setFilter]     = useState("all");

  const filtered = filter === "all"     ? WEEKS
    : filter === "peak"    ? WEEKS.filter(w => w.energy === "peak")
    : filter === "warning" ? WEEKS.filter(w => w.energy === "warning")
    : WEEKS.filter(w => ["good","transition","neutral"].includes(w.energy));

  const selectedWeek = WEEKS.find(w => w.id === selected);

  return (
    <div style={{
      fontFamily: "'Noto Serif TC', 'PingFang TC', serif",
      background: "#0D0F14",
      color: "#fff",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>

      {/* ── Top Bar ── */}
      <div style={{
        padding: "14px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(255,255,255,0.02)", flexShrink: 0
      }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>2026 命運時間軸</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
            乙巳日主 · 癸未大運 · 田宅宮大限 · 丙午流年
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { id: "all",     label: "全部"    },
            { id: "peak",    label: "◈ 高峰"  },
            { id: "warning", label: "◎ 謹慎"  },
            { id: "other",   label: "其他"    },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              background: filter === f.id ? "rgba(255,255,255,0.1)" : "none",
              border: `1px solid ${filter === f.id ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
              color: filter === f.id ? "#fff" : "rgba(255,255,255,0.4)",
              padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      {/* ── Legend ── */}
      <div style={{
        padding: "8px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex", gap: 20, alignItems: "center", flexShrink: 0, flexWrap: "wrap"
      }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>能量圖例</span>
        {Object.entries(ENERGY_CONFIG).map(([key, val]) => (
          <span key={key} style={{ fontSize: 10, color: val.color }}>
            {val.icon} {val.label}
          </span>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
          {Object.entries(SYSTEM_COLORS).map(([key, color]) => (
            <span key={key} style={{ fontSize: 10, color, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
              {key === "bazi" ? "八字" : key === "ziwei" ? "紫微" : "占星"}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Left: week list */}
        <div style={{
          width: 320, borderRight: "1px solid rgba(255,255,255,0.07)",
          overflowY: "auto", padding: "12px 12px"
        }}>
          {filtered.map(week => {
            const prevMonth = filtered[filtered.indexOf(week) - 1]?.month;
            return (
              <div key={week.id} style={{ position: "relative" }}>
                {week.id === CURRENT_WEEK_ID && (
                  <div style={{
                    position: "absolute", left: -12, top: "50%", transform: "translateY(-50%)",
                    width: 3, height: "70%", background: "#D4A843", borderRadius: 2
                  }} />
                )}
                {(!prevMonth || prevMonth !== week.month) && (
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", padding: "8px 4px 4px", letterSpacing: 2 }}>
                    {week.month}
                  </div>
                )}
                <WeekCard
                  week={week}
                  isSelected={selected === week.id}
                  onClick={() => setSelected(week.id)}
                />
              </div>
            );
          })}
        </div>

        {/* Right: detail */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {selectedWeek && <DetailPanel week={selectedWeek} />}
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div style={{
        padding: "10px 24px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(255,255,255,0.02)", flexShrink: 0
      }}>
        <button
          onClick={() => setSelected(s => Math.max(1, s - 1))}
          disabled={selected === 1}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)",
            color: selected === 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
            padding: "6px 16px", borderRadius: 6,
            cursor: selected === 1 ? "default" : "pointer", fontSize: 12
          }}
        >← 上一週</button>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
          第 {selected} / {WEEKS.length} 週
        </span>
        <button
          onClick={() => setSelected(s => Math.min(WEEKS.length, s + 1))}
          disabled={selected === WEEKS.length}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)",
            color: selected === WEEKS.length ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
            padding: "6px 16px", borderRadius: 6,
            cursor: selected === WEEKS.length ? "default" : "pointer", fontSize: 12
          }}
        >下一週 →</button>
      </div>

    </div>
  );
}
