import './globals.css';
import { Press_Start_2P, VT323, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-terminal',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${pressStart.variable} ${vt323.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
