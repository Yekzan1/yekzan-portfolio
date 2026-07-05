import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { profile, stats } from "@/lib/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — Portfolio`;

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "fr";
  const dict = getDictionary(l);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#07070a",
          color: "#f2f2f5",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* gradient glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(139,92,246,0.55), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(56,189,248,0.4), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #8b5cf6, #38bdf8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            YK
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 600 }}>{profile.name}</span>
            <span style={{ fontSize: 22, color: "#9a9aa6" }}>{profile.locationShort}</span>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 980 }}>
          <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {dict.hero.titleLead}{" "}
            <span style={{ color: "#a78bfa" }}>{dict.hero.titleAccent}</span> {dict.hero.titleTail}
          </span>
          <span style={{ fontSize: 30, color: "#9a9aa6", marginTop: 8 }}>{dict.meta.title}</span>
        </div>

        {/* Bottom: stats */}
        <div style={{ display: "flex", gap: 56 }}>
          {stats.map((s) => (
            <div key={s.labelKey} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 46, fontWeight: 700 }}>{s.value}</span>
              <span style={{ fontSize: 20, color: "#9a9aa6" }}>
                {dict.hero.statsLabels[s.labelKey as keyof typeof dict.hero.statsLabels]}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
