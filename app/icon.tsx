import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7a2230",
          color: "#fbf8f3",
          fontSize: 30,
          fontWeight: 600,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.04em",
          borderRadius: 12,
        }}
      >
        YK
      </div>
    ),
    { ...size },
  );
}
