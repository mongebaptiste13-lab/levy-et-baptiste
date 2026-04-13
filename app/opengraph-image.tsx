import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DataForge IA — Agence Data & Intelligence Artificielle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "#1a2e1a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(122,184,122,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(122,184,122,0.2)",
              border: "1.5px solid rgba(122,184,122,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#7ab87a",
            }}
          >
            D
          </div>
          <span style={{ fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.5px" }}>
            DataForge IA
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(122,184,122,0.15)",
              border: "1px solid rgba(122,184,122,0.3)",
              borderRadius: 100,
              padding: "8px 18px",
              width: "fit-content",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7ab87a" }} />
            <span style={{ fontSize: 13, color: "#7ab87a", letterSpacing: 2, textTransform: "uppercase" }}>
              Agence Data & IA
            </span>
          </div>

          <div style={{ fontSize: 64, fontWeight: 700, color: "#ffffff", lineHeight: 1.05, letterSpacing: "-2px" }}>
            Vos données,{"\n"}votre avantage.
          </div>

          <p style={{ fontSize: 22, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, maxWidth: 620 }}>
            Automatisation IA · Développement sur mesure · Infrastructure data
          </p>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, zIndex: 1 }}>
          {["40+ projets livrés", "Réponse < 24h", "Sur mesure"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7ab87a" }} />
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
