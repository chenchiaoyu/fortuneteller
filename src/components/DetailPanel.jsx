import { useState } from "react";
import { ENERGY_CONFIG, SYSTEM_COLORS } from "../data/weeks";
import EnergyBar from "./EnergyBar";

export default function DetailPanel({ week }) {
  const config = ENERGY_CONFIG[week.energy];
  const [tab, setTab] = useState("overview");

  const TABS = [
    { id: "overview", label: "總覽" },
    { id: "bazi",     label: "八字" },
    { id: "ziwei",    label: "紫微" },
    { id: "astro",    label: "占星" },
    { id: "action",   label: "行動" },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: config.bg }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            第 {week.id} 週 · {week.start} — {week.end}
          </span>
          <span style={{ fontSize: 11, color: config.color, background: `${config.color}22`, padding: "2px 8px", borderRadius: 4 }}>
            {config.icon} {config.label}
          </span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 8 }}>
          {week.title}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
          {week.summary}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
          🌙 {week.lunar} · ☯ {week.bazi_yun}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "10px 12px", fontSize: 12,
            color: tab === t.id ? "#fff" : "rgba(255,255,255,0.4)",
            borderBottom: `2px solid ${tab === t.id ? config.color : "transparent"}`,
            transition: "all 0.2s"
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>

        {tab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { key: "bazi",  label: "八字能量",  sys: "bazi"  },
                { key: "ziwei", label: "紫微能量", sys: "ziwei" },
                { key: "astro", label: "占星能量", sys: "astro" },
              ].map(({ key, label, sys }) => (
                <div key={key} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${SYSTEM_COLORS[sys]}33`,
                  borderRadius: 8, padding: 12
                }}>
                  <div style={{ fontSize: 10, color: SYSTEM_COLORS[sys], marginBottom: 8 }}>{label}</div>
                  <EnergyBar level={week[key].level} color={SYSTEM_COLORS[sys]} />
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>本週聚焦</div>
              <div style={{ fontSize: 14, color: config.color, fontWeight: 600 }}>{week.focus}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {week.tags.map(t => (
                <span key={t} style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: 20 }}>
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

        {tab === "bazi" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: SYSTEM_COLORS.bazi }}>八字分析</div>
              <EnergyBar level={week.bazi.level} color={SYSTEM_COLORS.bazi} />
            </div>
            <div style={{ background: `${SYSTEM_COLORS.bazi}11`, border: `1px solid ${SYSTEM_COLORS.bazi}33`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.9 }}>{week.bazi.text}</p>
            </div>
            <div style={{ padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>當前大運</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{week.bazi_yun} · {week.lunar}</div>
            </div>
          </div>
        )}

        {tab === "ziwei" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: SYSTEM_COLORS.ziwei }}>紫微斗數</div>
              <EnergyBar level={week.ziwei.level} color={SYSTEM_COLORS.ziwei} />
            </div>
            <div style={{ background: `${SYSTEM_COLORS.ziwei}11`, border: `1px solid ${SYSTEM_COLORS.ziwei}33`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.9 }}>{week.ziwei.text}</p>
            </div>
            <div style={{ padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>當前大限</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>田宅宮大限（貪狼）· 35–44歲</div>
            </div>
          </div>
        )}

        {tab === "astro" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: SYSTEM_COLORS.astro }}>西洋占星</div>
              <EnergyBar level={week.astro.level} color={SYSTEM_COLORS.astro} />
            </div>
            <div style={{ background: `${SYSTEM_COLORS.astro}11`, border: `1px solid ${SYSTEM_COLORS.astro}33`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.9 }}>{week.astro.text}</p>
            </div>
            <div style={{ padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>本命盤關鍵配置</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                太陽牡羊19°(11宮) · 月亮天秤18°(5宮) · 上升雙子16°
              </div>
            </div>
          </div>
        )}

        {tab === "action" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>✦ 本週行動建議</div>
              <div style={{ background: `${config.color}15`, border: `1px solid ${config.color}44`, borderRadius: 8, padding: 14 }}>
                <p style={{ fontSize: 13, color: "#fff", lineHeight: 1.8 }}>{week.action}</p>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>⚠ 本週注意事項</div>
              <div style={{ background: "rgba(200,92,62,0.1)", border: "1px solid rgba(200,92,62,0.3)", borderRadius: 8, padding: 14 }}>
                <p style={{ fontSize: 13, color: "rgba(255,200,180,0.9)", lineHeight: 1.8 }}>{week.warning}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
