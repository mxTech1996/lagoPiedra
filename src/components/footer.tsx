'use client';

import { Logo } from '@/components/logo';
import Link from 'next/link';
import { dataSite } from '@/lib/data';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className='w-full border-t border-border/70 bg-background/40 backdrop-blur'>
      <div className='container mx-auto px-6 py-16'>
        <div className='mb-14 overflow-hidden rounded-3xl border border-border/70 bg-secondary/20 p-8 md:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.55)]'>
          <div className='grid gap-8 md:grid-cols-12 md:items-center'>
            <div className='md:col-span-7'>
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <div className='absolute inset-0 rounded-2xl bg-primary/25 blur-xl' />
                  <Logo className='relative w-8 h-8' />
                </div>
                <span className='text-sm font-semibold tracking-[0.18em] uppercase text-foreground'>
                  {dataSite.shortName}
                </span>
              </div>
              <h3 className='mt-5 text-2xl md:text-3xl font-semibold tracking-tight text-foreground'>
                Aviation services designed for tourism destinations.
              </h3>
              <p className='mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl'>
                Scenic routes, aerial shows, and production support—planned with safety, timing, and guest experience at the center.
              </p>
            </div>
            <div className='md:col-span-5 md:justify-self-end'>
              <Link href='/contact'>
                <Button className='h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]'>
                  Request a Proposal <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-10 md:grid-cols-12'>
          <div className='md:col-span-5 space-y-4'>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              {dataSite.description}
            </p>
            <div className='flex flex-wrap gap-2'>
              {dataSite.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/20 px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/60 transition-all'
                >
                  {link.label}
                  <ArrowUpRight className='h-4 w-4 text-muted-foreground' />
                </Link>
              ))}
            </div>
          </div>

          <div className='md:col-span-4'>
            <h3 className='text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4'>
              Contact
            </h3>
            <div className='grid gap-4'>
              <a
                href={`mailto:${dataSite.email}`}
                className='rounded-2xl border border-border/70 bg-secondary/20 p-4 text-sm font-medium text-foreground hover:bg-secondary/60 transition-all'
              >
                {dataSite.email}
              </a>
              <div className='rounded-2xl border border-border/70 bg-secondary/20 p-4 text-sm font-medium text-foreground'>
                {dataSite.telephone}
              </div>
              <div className='rounded-2xl border border-border/70 bg-secondary/20 p-4 text-sm font-medium text-foreground'>
                {dataSite.address}
              </div>
            </div>
          </div>

          <div className='md:col-span-3'>
            <h3 className='text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4'>
              Legal
            </h3>
            <div className='grid gap-2'>
              <Link
                href='/pdf/TYC.pdf'
                target='_blank'
                className='rounded-2xl border border-border/70 bg-secondary/20 p-4 text-sm font-medium text-foreground hover:bg-secondary/60 transition-all'
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href='/pdf/AP.pdf'
                target='_blank'
                className='rounded-2xl border border-border/70 bg-secondary/20 p-4 text-sm font-medium text-foreground hover:bg-secondary/60 transition-all'
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-14 flex flex-col gap-3 border-t border-border/60 pt-8 md:flex-row md:items-center md:justify-between'>
          <p className='text-xs text-muted-foreground'>
            © {new Date().getFullYear()} {dataSite.name}. All rights reserved.
          </p>
          <p className='text-xs text-muted-foreground'>
            Built for destinations, events, and unforgettable views.
          </p>
        </div>
      </div>
    </footer>
  );
}
