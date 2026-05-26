import type { Metadata } from "next";
import "../styles.css";

export const metadata: Metadata = {
  title: "Rekaz Website Builder",
  description:
    "A responsive mini website builder with live preview, section editing, drag-and-drop ordering, and JSON import/export.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
