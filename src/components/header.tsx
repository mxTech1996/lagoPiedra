'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from 'ui-old-version';
import { cn } from '@/lib/utils';
import { dataSite } from '@/lib/data';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const cartContext = useContext(CartContext);
  const products = cartContext?.products || [];
  const router = useRouter();

  const isProducts = pathname === '/products';

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-4 pt-4'>
        <div className='flex w-full items-center justify-between rounded-2xl border border-border/60 bg-background/30 px-4 py-3 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_rgba(0,0,0,0.55)]'>
          <Link href='/' className='flex items-center gap-3'>
            <div className='relative'>
              <div className='absolute inset-0 rounded-xl bg-primary/20 blur-lg' />
              <Logo className='relative' />
            </div>
            <span className='text-sm font-semibold tracking-[0.18em] text-foreground uppercase'>
              {dataSite.shortName}
            </span>
          </Link>

          <nav className='hidden md:flex items-center gap-2'>
            {dataSite.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
                  pathname === link.href && 'text-foreground bg-secondary/70'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-2'>
            <div className='hidden md:flex items-center gap-2'>
              {isProducts && (
                <ButtonShoppingCart
                  onClick={() => router.push('/my-cart')}
                  count={products.length}
                />
              )}
              <Button
                onClick={() => router.push('/contact')}
                className='h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-5 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]'
              >
                Request Proposal
              </Button>
            </div>

            <div className='md:hidden'>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-10 w-10 rounded-full text-foreground hover:bg-secondary/70'
                  >
                    <Menu className='h-5 w-5' />
                    <span className='sr-only'>Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side='right'
                  className='w-full sm:w-[360px] p-0 border-l border-border bg-background/95 backdrop-blur-xl'
                >
                  <SheetHeader className='p-6 border-b border-border/70'>
                    <div className='flex items-center justify-between'>
                      <Link
                        href='/'
                        className='flex items-center gap-3'
                        onClick={() => setIsOpen(false)}
                      >
                        <span className='text-sm font-semibold tracking-[0.18em] uppercase'>
                          {dataSite.shortName}
                        </span>
                      </Link>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => setIsOpen(false)}
                        className='h-10 w-10 rounded-full hover:bg-secondary/70'
                      >
                        <X className='h-5 w-5' />
                      </Button>
                    </div>
                  </SheetHeader>

                  <div className='p-6'>
                    <div className='grid gap-2'>
                      {dataSite.navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            'rounded-2xl border border-border/70 bg-secondary/30 px-4 py-4 text-base font-semibold text-foreground',
                            'hover:bg-secondary/60 transition-all'
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    <div className='mt-6'>
                      <Button
                        onClick={() => {
                          router.push('/contact');
                          setIsOpen(false);
                        }}
                        className='h-12 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]'
                      >
                        Request Proposal
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ButtonShoppingCart({
  onClick,
  count,
}: {
  onClick: () => void;
  count: number;
}) {
  return (
    <Button
      variant='outline'
      size='icon'
      className='relative h-10 w-10 rounded-full border-border/70 bg-background/20 hover:bg-secondary/70 hover:text-foreground transition-all'
      onClick={onClick}
    >
      <ShoppingBag className='h-5 w-5' />
      {count > 0 && (
        <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground'>
          {count}
        </span>
      )}
    </Button>
  );
}
