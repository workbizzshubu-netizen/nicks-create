import "./globals.css";

export const metadata = {
  title: "nicks.create",
  description: "Creative × Design × Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white overflow-x-hidden">

        {/* ===== ANIMATED + SCROLL REACTIVE GLOW ===== */}
        <div
          id="glow-layer"
          className="pointer-events-none fixed inset-0 z-0"
        >
          <div className="glow glow-purple" />
          <div className="glow glow-pink" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10">{children}</div>

        {/* SCROLL SCRIPT */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const layer = document.getElementById("glow-layer");
              window.addEventListener("scroll", () => {
                const y = window.scrollY * 0.15;
                layer.style.transform = \`translateY(\${y}px)\`;
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
