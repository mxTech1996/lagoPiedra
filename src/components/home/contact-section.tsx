'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { dataSite } from '@/lib/data';

export function ContactSection() {
  return (
    <section className='relative w-full py-24 md:py-32'>
      <div className='container mx-auto px-6'>
        <div className='relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_60%)]' />
          <div className='absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-accent/18 blur-[140px]' />

          <div className='relative grid grid-cols-1 gap-10 p-8 md:p-12 lg:grid-cols-12 lg:gap-12'>
            <div className='lg:col-span-7 space-y-6'>
              <div className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-secondary/25 px-4 py-2'>
                <span className='h-2 w-2 rounded-full bg-primary' />
                <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                  Contact
                </span>
              </div>

              <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground'>
                Plan the flight experience your destination deserves.
              </h2>

              <p className='text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl'>
                Share your destination, preferred dates, and goals. We&apos;ll reply with a clear plan for scenic flights, aerial shows, or production support.
              </p>

              <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                <Link href='/contact'>
                  <Button className='h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]'>
                    Request a Proposal <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
                <Link href={`mailto:${dataSite.email}`}>
                  <Button
                    variant='outline'
                    className='h-12 rounded-2xl border-border/70 bg-background/20 px-6 font-semibold hover:bg-secondary/70'
                  >
                    Email Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className='lg:col-span-5'>
              <div className='grid gap-3'>
                <div className='rounded-3xl border border-border/60 bg-secondary/20 p-6'>
                  <div className='flex items-start gap-4'>
                    <div className='h-12 w-12 rounded-2xl border border-border/60 bg-background/20 flex items-center justify-center text-primary'>
                      <Mail className='h-5 w-5' />
                    </div>
                    <div className='min-w-0'>
                      <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                        Email
                      </p>
                      <a
                        href={`mailto:${dataSite.email}`}
                        className='mt-2 block text-sm font-semibold text-foreground hover:text-primary transition-colors break-all'
                      >
                        {dataSite.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className='rounded-3xl border border-border/60 bg-secondary/20 p-6'>
                  <div className='flex items-start gap-4'>
                    <div className='h-12 w-12 rounded-2xl border border-border/60 bg-background/20 flex items-center justify-center text-primary'>
                      <Phone className='h-5 w-5' />
                    </div>
                    <div className='min-w-0'>
                      <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                        Phone
                      </p>
                      <p className='mt-2 text-sm font-semibold text-foreground'>
                        {dataSite.telephone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='rounded-3xl border border-border/60 bg-secondary/20 p-6'>
                  <div className='flex items-start gap-4'>
                    <div className='h-12 w-12 rounded-2xl border border-border/60 bg-background/20 flex items-center justify-center text-primary'>
                      <MapPin className='h-5 w-5' />
                    </div>
                    <div className='min-w-0'>
                      <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                        Location
                      </p>
                      <p className='mt-2 text-sm font-semibold text-foreground'>
                        {dataSite.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
