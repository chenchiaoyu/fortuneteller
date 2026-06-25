import { useState, useEffect } from "react";
import { WEEKS, ENERGY_CONFIG, SYSTEM_COLORS } from "./data/weeks";
import WeekCard from "./components/WeekCard";
import DetailPanel from "./components/DetailPanel";

const CURRENT_WEEK_ID = 1;
const MIN_ID = Math.min(...WEEKS.map(w => w.id));
const MAX_ID = Math.max(...WEEKS.map(w => w.id));

export default function App() {
  const [selected, setSelected]   = useState(CURRENT_WEEK_ID);
  const [filter, setFilter]       = useState("all");
  const [view, setView]           = useState("list"); // mobile: "list" | "detail"
  const [isMobile, setIsMobile]   = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = filter === "all"     ? WEEKS
    : filter === "peak"    ? WEEKS.filter(w => w.energy === "peak")
    : filter === "warning" ? WEEKS.filter(w => w.energy === "warning")
    : WEEKS.filter(w => ["good","transition","neutral"].includes(w.energy));

  const selectedWeek = WEEKS.find(w => w.id === selected);

  const handleSelect = (id) => {
    setSelected(id);
    if (isMobile) setView("detail");
  };

  const FILTERS = [
    { id: "all",     label: "全部"   },
    { id: "peak",    label: "高峰"   },
    { id: "warning", label: "謹慎"   },
    { id: "other",   label: "其他"   },
  ];

  return (
    <div style={{
      fontFamily: "'Noto Serif TC', 'PingFang TC', serif",
      background: "#0D0F14",
      color: "#fff",
      height: "100dvh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>

      {/* ── Top Bar ── */}
      <div style={{
        padding: isMobile ? "12px 16px" : "14px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        flexShrink: 0
      }}>
        {/* Mobile: back button when in detail view */}
        {isMobile && view === "detail" ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setView("list")} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.6)",
              fontSize: 14, cursor: "pointer", padding: "4px 8px 4px 0",
              display: "flex", alignItems: "center", gap: 6
            }}>
              ← 返回
            </button>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
              W{selectedWeek?.id} {selectedWeek?.start}–{selectedWeek?.end}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 700, letterSpacing: 2 }}>
                2026 命運時間軸
              </div>
              {!isMobile && (
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                  乙巳日主 · 癸未大運 · 田宅宮大限 · 丙午流年
                </div>
              )}
            </div>
            {/* Filter buttons */}
            <div style={{ display: "flex", gap: isMobile ? 4 : 8 }}>
              {FILTERS.map(f => (
                <button key={f.id} onClick={() => setFilter(f.id)} style={{
                  background: filter === f.id ? "rgba(255,255,255,0.12)" : "none",
                  border: `1px solid ${filter === f.id ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
                  color: filter === f.id ? "#fff" : "rgba(255,255,255,0.45)",
                  padding: isMobile ? "4px 8px" : "5px 12px",
                  borderRadius: 6, cursor: "pointer",
                  fontSize: isMobile ? 11 : 11,
                  whiteSpace: "nowrap"
                }}>{f.label}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Legend (desktop only) ── */}
      {!isMobile && (
        <div style={{
          padding: "8px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", gap: 16, alignItems: "center",
          flexShrink: 0, flexWrap: "wrap"
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
      )}

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Week List — always shown on desktop, conditionally on mobile */}
        {(!isMobile || view === "list") && (
          <div style={{
            width: isMobile ? "100%" : 300,
            borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.07)",
            overflowY: "auto",
            padding: isMobile ? "12px 16px" : "12px"
          }}>
            {/* Mobile legend */}
            {isMobile && (
              <div style={{
                display: "flex", gap: 10, flexWrap: "wrap",
                padding: "8px 0 12px", marginBottom: 4,
                borderBottom: "1px solid rgba(255,255,255,0.06)"
              }}>
                {Object.entries(ENERGY_CONFIG).map(([key, val]) => (
                  <span key={key} style={{ fontSize: 10, color: val.color }}>
                    {val.icon} {val.label}
                  </span>
                ))}
              </div>
            )}

            {filtered.map(week => {
              const prevMonth = filtered[filtered.indexOf(week) - 1]?.month;
              return (
                <div key={week.id} style={{ position: "relative" }}>
                  {week.id === CURRENT_WEEK_ID && (
                    <div style={{
                      position: "absolute", left: isMobile ? -16 : -12,
                      top: "50%", transform: "translateY(-50%)",
                      width: 3, height: "70%", background: "#D4A843", borderRadius: 2
                    }} />
                  )}
                  {(!prevMonth || prevMonth !== week.month) && (
                    <div style={{
                      fontSize: 11, color: "rgba(255,255,255,0.25)",
                      padding: "10px 4px 5px", letterSpacing: 3,
                      borderTop: prevMonth ? "1px solid rgba(255,255,255,0.05)" : "none",
                      marginTop: prevMonth ? 4 : 0
                    }}>
                      {week.month}
                    </div>
                  )}
                  <WeekCard
                    week={week}
                    isSelected={!isMobile && selected === week.id}
                    onClick={() => handleSelect(week.id)}
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
            <div style={{ height: 20 }} />
          </div>
        )}

        {/* Detail Panel — always shown on desktop, conditionally on mobile */}
        {(!isMobile || view === "detail") && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            {selectedWeek && <DetailPanel week={selectedWeek} isMobile={isMobile} />}
          </div>
        )}
      </div>

      {/* ── Bottom Nav ── */}
      <div style={{
        padding: isMobile ? "10px 16px" : "10px 24px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(255,255,255,0.02)", flexShrink: 0
      }}>
        <button
          onClick={() => {
            const idx = WEEKS.findIndex(w => w.id === selected);
            if (idx > 0) { setSelected(WEEKS[idx-1].id); if (isMobile) setView("detail"); }
          }}
          disabled={selected === MIN_ID}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)",
            color: selected === 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
            padding: isMobile ? "8px 16px" : "6px 16px",
            borderRadius: 6, cursor: selected === 1 ? "default" : "pointer",
            fontSize: 12
          }}
        >← 上一週</button>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
          第 {WEEKS.findIndex(w=>w.id===selected)+1} / {WEEKS.length} 週
        </span>
        <button
          onClick={() => {
            const idx = WEEKS.findIndex(w => w.id === selected);
            if (idx < WEEKS.length-1) { setSelected(WEEKS[idx+1].id); if (isMobile) setView("detail"); }
          }}
          disabled={selected === MAX_ID}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)",
            color: selected === WEEKS.length ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
            padding: isMobile ? "8px 16px" : "6px 16px",
            borderRadius: 6, cursor: selected === WEEKS.length ? "default" : "pointer",
            fontSize: 12
          }}
        >下一週 →</button>
      </div>

    </div>
  );
}
