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
          padding: "68px 76px",
          background: "#fbf8f3",
          color: "#1b1714",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(27,23,20,0.18)",
            paddingBottom: 22,
            fontSize: 22,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#5c534a",
          }}
        >
          <span style={{ color: "#1b1714" }}>{profile.name}</span>
          <span>{profile.locationShort}</span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 920 }}>
          <span style={{ fontSize: 62, fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {dict.hero.titleLead}{" "}
            <span style={{ fontStyle: "italic", color: "#7a2230" }}>{dict.hero.titleAccent}</span>{" "}
            {dict.hero.titleTail}
          </span>
        </div>

        {/* Figures */}
        <div style={{ display: "flex", gap: 64, borderTop: "1px solid rgba(27,23,20,0.18)", paddingTop: 26 }}>
          {stats.map((s) => (
            <div key={s.labelKey} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 44, fontWeight: 500 }}>{s.value}</span>
              <span style={{ fontSize: 19, color: "#5c534a", fontFamily: "sans-serif" }}>
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
