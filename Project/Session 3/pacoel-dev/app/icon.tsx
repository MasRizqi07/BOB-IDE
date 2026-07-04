import { ImageResponse } from "next/og";

/**
 * Dynamic favicon generated at build time.
 * Renders the "P" monogram on a dark background with a cyan ring.
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050a14",
          borderRadius: 8,
          border: "1.5px solid rgba(6,182,212,0.45)",
          fontFamily: "monospace",
          fontSize: 18,
          fontWeight: 700,
          color: "#06b6d4",
          letterSpacing: 0,
        }}
      >
        P
      </div>
    ),
    { ...size }
  );
}
