import { ImageResponse } from "next/og";
import blogData from "../../../data/blogData";

export const runtime = "edge";

export const size   = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage({ params }) {
  const post = blogData.find((p) => p.slug === params.slug);

  const title    = post ? post.title    : "BranCodeX Blog";
  const excerpt  = post ? post.excerpt  : "Web development insights from Cameroon.";
  const category = post ? post.category : "Article";
  const author   = post ? post.author   : "Beng Brandon Che";

  // Truncate excerpt to ~120 chars
  const shortExcerpt = excerpt.length > 120 ? excerpt.slice(0, 117) + "…" : excerpt;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", background: "rgba(79,70,229,0.12)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 340, height: 340, borderRadius: "50%", background: "rgba(251,191,36,0.07)", display: "flex" }} />

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", padding: "40px 60px 0", gap: 16 }}>
          {/* Logo */}
          <div style={{ display: "flex", fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>
            <span style={{ color: "#22c55e" }}>Bran</span>
            <span style={{ color: "#ef4444" }}>Code</span>
            <span style={{ color: "#facc15" }}>X</span>
          </div>
          <div style={{ flex: 1, display: "flex" }} />
          {/* Category pill */}
          <div style={{
            background: "rgba(79,70,229,0.35)",
            border: "1px solid rgba(129,140,248,0.4)",
            borderRadius: 20,
            padding: "6px 18px",
            fontSize: 14,
            fontWeight: 700,
            color: "#a5b4fc",
            display: "flex",
          }}>
            {category}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 60px" }}>
          {/* Title */}
          <div style={{
            fontSize: title.length > 60 ? 40 : 48,
            fontWeight: 900,
            color: "#f8fafc",
            lineHeight: 1.18,
            marginBottom: 24,
            maxWidth: 960,
            display: "flex",
          }}>
            {title}
          </div>

          {/* Accent line */}
          <div style={{
            width: 80,
            height: 4,
            borderRadius: 2,
            background: "linear-gradient(90deg, #4f46e5, #fbbf24)",
            marginBottom: 24,
            display: "flex",
          }} />

          {/* Excerpt */}
          <div style={{
            fontSize: 20,
            color: "#94a3b8",
            lineHeight: 1.55,
            maxWidth: 860,
            display: "flex",
          }}>
            {shortExcerpt}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "0 60px 40px",
          gap: 24,
        }}>
          {/* Author avatar placeholder */}
          <div style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 900,
            color: "#fff",
          }}>
            {author.charAt(0)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", display: "flex" }}>{author}</div>
            <div style={{ fontSize: 13, color: "#64748b", display: "flex" }}>brancodex.com</div>
          </div>
          <div style={{ flex: 1, display: "flex" }} />
          <div style={{ fontSize: 14, color: "#475569", display: "flex" }}>brancodex.com/blog</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
