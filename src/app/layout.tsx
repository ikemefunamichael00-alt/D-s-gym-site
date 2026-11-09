import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "D's GYM | Track Weight Loss & Health Performance",
  description: "Track your weight loss progress, calculate BMI, get personalized kilogram deficit advice, and maintain daily check-in habits.",
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
      <body className="bg-background text-zinc-100 min-h-screen selection:bg-neon-lime selection:text-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
