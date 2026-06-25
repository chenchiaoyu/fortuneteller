import { useState } from "react";
import { ENERGY_CONFIG, SYSTEM_COLORS } from "../data/weeks";
import EnergyBar from "./EnergyBar";

export default function DetailPanel({ week, isMobile }) {
  const config = ENERGY_CONFIG[week.energy];
  const [tab, setTab] = useState("overview");

  const TABS = [
    { id: "overview", label: "總覽"   },
    { id: "bazi",     label: "八字"   },
    { id: "ziwei",    label: "紫微"   },
    { id: "astro",    label: "占星"   },
    { id: "action",   label: "行動"   },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>

      {/* Header */}
      <div style={{
        padding: isMobile ? "16px 16px 14px" : "20px 24px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: config.bg
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            第 {week.id} 週 · {week.start} — {week.end}
          </span>
          <span style={{
            fontSize: 11, color: config.color,
            background: `${config.color}22`, padding: "2px 8px", borderRadius: 4
          }}>
            {config.icon} {config.label}
          </span>
        </div>

        <div style={{
          fontSize: isMobile ? 18 : 20,
          fontWeight: 700, color: "#fff",
          lineHeight: 1.4, marginBottom: 10
        }}>
          {week.title}
        </div>

        <div style={{
          fontSize: isMobile ? 13 : 12,
          color: "rgba(255,255,255,0.62)",
          lineHeight: 1.85
        }}>
          {week.summary}
        </div>

        <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
          🌙 {week.lunar} · ☯ {week.bazi_yun}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: isMobile ? "0 16px" : "0 24px",
        overflowX: "auto",
        flexShrink: 0
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: isMobile ? "11px 14px" : "10px 12px",
            fontSize: isMobile ? 13 : 12,
            color: tab === t.id ? "#fff" : "rgba(255,255,255,0.4)",
            borderBottom: `2px solid ${tab === t.id ? config.color : "transparent"}`,
            transition: "all 0.2s",
            whiteSpace: "nowrap",
            flexShrink: 0
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: isMobile ? "16px 16px" : "20px 24px",
        overflowY: "auto"
      }}>

        {tab === "overview" && (
          <div>
            {/* Energy cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr 1fr" : "1fr 1fr 1fr",
              gap: isMobile ? 8 : 12,
              marginBottom: 20
            }}>
              {[
                { key: "bazi",  label: "八字",  sys: "bazi"  },
                { key: "ziwei", label: "紫微",  sys: "ziwei" },
                { key: "astro", label: "占星",  sys: "astro" },
              ].map(({ key, label, sys }) => (
                <div key={key} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${SYSTEM_COLORS[sys]}33`,
                  borderRadius: 10, padding: isMobile ? "12px 10px" : 12,
                  display: "flex", flexDirection: "column", gap: 8
                }}>
                  <div style={{ fontSize: isMobile ? 11 : 10, color: SYSTEM_COLORS[sys] }}>{label}</div>
                  <EnergyBar level={week[key].level} color={SYSTEM_COLORS[sys]} />
                </div>
              ))}
            </div>

            {/* Focus */}
            <div style={{
              background: "rgba(255,255,255,0.04)", borderRadius: 10,
              padding: isMobile ? "14px 16px" : 16, marginBottom: 14
            }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>本週聚焦</div>
              <div style={{ fontSize: isMobile ? 16 : 14, color: config.color, fontWeight: 600 }}>
                {week.focus}
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {week.tags.map(t => (
                <span key={t} style={{
                  fontSize: 12, color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "4px 12px", borderRadius: 20
                }}>#{t}</span>
              ))}
            </div>
          </div>
        )}

        {["bazi","ziwei","astro"].includes(tab) && (() => {
          const sysMap = { bazi: "八字分析", ziwei: "紫微斗數", astro: "西洋占星" };
          const footerMap = {
            bazi:  `當前大運：${week.bazi_yun} · ${week.lunar}`,
            ziwei: "田宅宮大限（貪狼）· 35–44歲",
            astro: "太陽牡羊19°(11宮) · 月亮天秤18°(5宮) · 上升雙子16°"
          };
          const color = SYSTEM_COLORS[tab];
          return (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ fontSize: 12, color }}>{sysMap[tab]}</div>
                <EnergyBar level={week[tab].level} color={color} />
              </div>
              <div style={{
                background: `${color}11`, border: `1px solid ${color}33`,
                borderRadius: 10, padding: isMobile ? "16px" : 16, marginBottom: 14
              }}>
                <p style={{ fontSize: isMobile ? 14 : 13, color: "rgba(255,255,255,0.88)", lineHeight: 2 }}>
                  {week[tab].text}
                </p>
              </div>
              <div style={{ padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>
                  {tab === "astro" ? "本命盤關鍵配置" : tab === "bazi" ? "當前大運" : "當前大限"}
                </div>
                <div style={{ fontSize: isMobile ? 12 : 12, color: "rgba(255,255,255,0.55)" }}>
                  {footerMap[tab]}
                </div>
              </div>
            </div>
          );
        })()}

        {tab === "action" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
                ✦ 本週行動建議
              </div>
              <div style={{
                background: `${config.color}15`,
                border: `1px solid ${config.color}44`,
                borderRadius: 10, padding: isMobile ? "16px" : 14
              }}>
                <p style={{ fontSize: isMobile ? 14 : 13, color: "#fff", lineHeight: 1.9 }}>
                  {week.action}
                </p>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
                ⚠ 本週注意事項
              </div>
              <div style={{
                background: "rgba(200,92,62,0.1)",
                border: "1px solid rgba(200,92,62,0.35)",
                borderRadius: 10, padding: isMobile ? "16px" : 14
              }}>
                <p style={{ fontSize: isMobile ? 14 : 13, color: "rgba(255,210,190,0.9)", lineHeight: 1.9 }}>
                  {week.warning}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
