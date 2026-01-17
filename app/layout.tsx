import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  title: "nicks.create",
  description: "Creative Design & Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Custom glass cursor for full website */}
        <CustomCursor />

        {/* ✅ Site content */}
        {children}
      </body>
    </html>
  );
}
