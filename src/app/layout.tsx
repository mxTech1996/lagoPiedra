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
    <html lang='en' className='scroll-smooth'>
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-sans antialiased',
          inter.variable
        )}
      >
        <div className='relative flex min-h-dvh flex-col bg-background'>
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
