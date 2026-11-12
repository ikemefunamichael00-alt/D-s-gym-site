import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "anygym — Universal Gym Membership | Health & Progress Platform",
  description: "Universal gym membership, personalized 30-day transformation workout plans, WHO BMI weight advice, and daily habit tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-surface-base text-white min-h-screen selection:bg-brand-coral selection:text-white font-sans antialiased bg-mesh-pattern">
        {children}
      </body>
    </html>
  );
}
