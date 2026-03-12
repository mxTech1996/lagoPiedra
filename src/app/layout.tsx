import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import Provider from './provider';
import { dataSite } from '@/lib/data';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: dataSite.title,
  description: dataSite.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth dark'>
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-sans antialiased',
          inter.variable
        )}
      >
        <div className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
          <div className='absolute -top-40 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]' />
          <div className='absolute -bottom-48 right-[-140px] h-[520px] w-[520px] rounded-full bg-accent/20 blur-[140px]' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_52%)]' />
          <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.08]' />
        </div>
        <div className='relative flex min-h-dvh flex-col'>
          <Provider>
            <Header />
            <main className='flex-1 flex flex-col items-center w-full'>
              {children}
            </main>
            <Footer />
          </Provider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
