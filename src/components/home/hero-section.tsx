'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { dataSite } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Radar, ShieldCheck, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className='relative w-full overflow-hidden pt-32 md:pt-40 pb-20'>
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 opacity-30'>
          <Image
            src={dataSite.imagesHero[0]}
            alt='Aerial view over a tourism coastline'
            fill
            priority
            className='object-cover'
          />
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-background/20 via-background/70 to-background' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_52%)]' />
      </div>

      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='lg:col-span-6'
          >
            <div className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/30 px-4 py-2 backdrop-blur-xl'>
              <span className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary'>
                <Radar className='h-4 w-4' />
              </span>
              <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                Tourism aviation • est. 2024
              </span>
            </div>

            <h1 className='mt-8 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground'>
              Flights, flyovers, and
              <span className='block text-primary'> unforgettable views.</span>
            </h1>

            <p className='mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl'>
              {dataSite.description} Built for resorts, festivals, and destination campaigns—designed to feel premium, run smoothly, and stay safe.
            </p>

            <div className='mt-10 flex flex-col sm:flex-row gap-3'>
              <Link href='/products'>
                <Button className='h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]'>
                  Explore Experiences <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
              <Link href='/contact'>
                <Button
                  variant='outline'
                  className='h-12 rounded-2xl border-border/70 bg-background/20 px-6 font-semibold hover:bg-secondary/70'
                >
                  Request a Proposal
                </Button>
              </Link>
            </div>

            <div className='mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl'>
              <div className='rounded-2xl border border-border/60 bg-background/25 p-4 backdrop-blur-xl'>
                <div className='flex items-center gap-2 text-primary'>
                  <ShieldCheck className='h-4 w-4' />
                  <span className='text-xs font-semibold tracking-[0.18em] uppercase'>Safety</span>
                </div>
                <p className='mt-2 text-sm text-muted-foreground'>Briefings, coordination, and operational discipline.</p>
              </div>
              <div className='rounded-2xl border border-border/60 bg-background/25 p-4 backdrop-blur-xl'>
                <div className='flex items-center gap-2 text-primary'>
                  <Sparkles className='h-4 w-4' />
                  <span className='text-xs font-semibold tracking-[0.18em] uppercase'>Experience</span>
                </div>
                <p className='mt-2 text-sm text-muted-foreground'>Routes and show moments designed to impress.</p>
              </div>
              <div className='rounded-2xl border border-border/60 bg-background/25 p-4 backdrop-blur-xl'>
                <div className='flex items-center gap-2 text-primary'>
                  <ArrowRight className='h-4 w-4' />
                  <span className='text-xs font-semibold tracking-[0.18em] uppercase'>Timing</span>
                </div>
                <p className='mt-2 text-sm text-muted-foreground'>Schedules tuned for events and guest arrivals.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className='lg:col-span-6'
          >
            <div className='relative grid gap-4'>
              <div className='relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 backdrop-blur-xl'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_55%)]' />
                <div className='relative p-6 md:p-8'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                        Flight Panel
                      </p>
                      <p className='mt-2 text-lg font-semibold text-foreground'>
                        Destination-ready operations
                      </p>
                    </div>
                    <div className='rounded-2xl border border-border/60 bg-secondary/30 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                      Live
                    </div>
                  </div>

                  <div className='mt-6 grid grid-cols-2 gap-3'>
                    <div className='rounded-2xl border border-border/60 bg-secondary/20 p-4'>
                      <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>Altitude</p>
                      <p className='mt-2 text-2xl font-semibold text-foreground'>1,200ft</p>
                    </div>
                    <div className='rounded-2xl border border-border/60 bg-secondary/20 p-4'>
                      <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>Speed</p>
                      <p className='mt-2 text-2xl font-semibold text-foreground'>95kt</p>
                    </div>
                    <div className='col-span-2 rounded-2xl border border-border/60 bg-secondary/20 p-4 flex items-center justify-between'>
                      <div>
                        <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>Status</p>
                        <p className='mt-2 text-sm font-semibold text-foreground'>Ready for takeoff window</p>
                      </div>
                      <div className='h-10 w-10 rounded-2xl bg-primary/20 text-primary flex items-center justify-center'>
                        <Radar className='h-5 w-5' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 backdrop-blur-xl'>
                  <div className='absolute inset-0 opacity-80'>
                    <Image
                      src={dataSite.imagesHero[1]}
                      alt='Aircraft detail over a tourism destination'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent' />
                  <div className='relative p-6'>
                    <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                      Aerial Shows
                    </p>
                    <p className='mt-2 text-lg font-semibold text-foreground'>Built for events</p>
                    <p className='mt-2 text-sm text-muted-foreground'>Flyovers and performances synced to your program.</p>
                  </div>
                </div>

                <div className='relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 backdrop-blur-xl'>
                  <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_60%)]' />
                  <div className='relative p-6'>
                    <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                      Production Support
                    </p>
                    <p className='mt-2 text-lg font-semibold text-foreground'>Cinematic flight paths</p>
                    <p className='mt-2 text-sm text-muted-foreground'>Stabilized passes and timing for shot lists.</p>
                    <div className='mt-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/25 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                      Golden-hour ready
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
