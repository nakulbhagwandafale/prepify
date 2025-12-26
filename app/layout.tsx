import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { InterviewProvider } from './context/InterviewContext';
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Preply - AI Interview Practice',
  description: 'Practice interviews with AI-powered feedback',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <InterviewProvider>
            {children}
          </InterviewProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

