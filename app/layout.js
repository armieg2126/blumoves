import "./globals.css";

export const metadata = {
  title: "BluMoves | Easy & Done — Movers in Northern NJ",
  description:
    "BluMoves is a local moving company serving Northern NJ & Morris County. 50+ moves completed. Fast, careful, no-stress moving. Call now for a free quote.",
  openGraph: {
    title: "BluMoves | Easy & Done",
    description: "Local movers in Northern NJ & Morris County. 50+ moves done. Call for a free quote.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Archivo+Black&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
