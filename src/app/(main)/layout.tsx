import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { AppContextProvider } from '@/context/app-context';
import Contact from '@/components/layout/contact';
import Customizer from '@/components/ui/customizer';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Lenis from '@/components/layout/lenis';
import PageClose from '@/components/ui/page-close';
import PageOpen from '@/components/ui/page-open';
import '@/app/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '900'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('font-sans antialiased', outfit.variable)}>
        <AppContextProvider>
          <Lenis>
            <Header />
            {children}
            <Footer />
          </Lenis>
          <Contact />
          <PageOpen className={cn('fixed inset-0 z-10', 'w-screen h-screen')} />
          <PageClose className={cn('fixed inset-0 z-10', 'w-screen h-screen')} />
          <Customizer />
        </AppContextProvider>
      </body>
    </html>
  );
}
