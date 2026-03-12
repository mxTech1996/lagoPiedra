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
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border transition-all">
      <div className='container mx-auto flex items-center justify-between px-6 h-20'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-3 group'>
          <Logo />
          <span className='font-bold text-xl tracking-tight text-foreground'>
            {dataSite.shortName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center gap-10'>
          {dataSite.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-4'>
          <div className='hidden md:flex items-center gap-4'>
            {isProducts && (
              <ButtonShoppingCart
                onClick={() => router.push('/my-cart')}
                count={products.length}
              />
            )}
            <Button 
              onClick={() => router.push('/contact')} 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 rounded-md shadow-sm transition-all"
            >
              Request Proposal
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className='md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className="text-foreground hover:bg-secondary rounded-md">
                  <Menu className="h-6 w-6" />
                  <span className='sr-only'>Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-full sm:w-[300px] p-0 border-l border-border'>
                <SheetHeader className="p-6 border-b border-border bg-muted/30">
                  <div className='flex justify-between items-center'>
                    <Link
                      href='/'
                      className='flex items-center gap-2'
                      onClick={() => setIsOpen(false)}
                    >
                      <span className='font-bold text-xl tracking-tight'>
                        {dataSite.shortName}
                      </span>
                    </Link>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => setIsOpen(false)}
                      className="rounded-full hover:bg-secondary"
                    >
                      <X className='h-5 w-5' />
                    </Button>
                  </div>
                </SheetHeader>
                <div className='flex flex-col p-6 gap-2'>
                  {dataSite.navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className='text-lg font-medium text-foreground hover:text-primary py-3 px-4 hover:bg-secondary rounded-md transition-all'
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button 
                      onClick={() => {
                        router.push('/contact');
                        setIsOpen(false);
                      }}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-6 rounded-md shadow-sm"
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
      className='relative rounded-md border-border hover:bg-secondary hover:text-foreground transition-all'
      onClick={onClick}
    >
      <ShoppingBag className='h-5 w-5' />
      {count > 0 && (
        <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-bold text-primary-foreground rounded-full'>
          {count}
        </span>
      )}
    </Button>
  );
}
