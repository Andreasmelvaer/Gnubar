import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This root layout is minimal — the [locale]/layout.tsx handles html/body/head
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
