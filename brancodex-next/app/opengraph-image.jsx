import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BranCodeX — Web Development Agency · Bamenda, Cameroon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow effects */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
            top: -100,
            left: -100,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
            bottom: -80,
            right: -80,
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              color: "white",
              fontWeight: "bold",
              boxShadow: "0 0 30px rgba(34,197,94,0.4)",
            }}
          >
            B
          </div>
          <span
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "white",
              letterSpacing: -1,
            }}
          >
            Bran
            <span style={{ color: "#22c55e" }}>Code</span>X
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            marginBottom: 40,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Web Development Agency
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: 900,
            marginBottom: 40,
          }}
        >
          Fast. Modern. Results-Driven.
        </div>

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 4,
            background: "linear-gradient(90deg, #22c55e, #3b82f6)",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        {/* Pill badges */}
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Next.js", "React", "Tailwind CSS", "SEO Optimized"].map((tech) => (
            <div
              key={tech}
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: 999,
                padding: "8px 20px",
                color: "#22c55e",
                fontSize: 18,
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Location footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#475569",
            fontSize: 20,
          }}
        >
          <span>📍</span>
          <span>Bamenda, Cameroon · Serving Clients Worldwide · brancodex.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
