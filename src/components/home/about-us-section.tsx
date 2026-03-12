'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { dataSite } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AboutUsSection() {
  return (
    <section id='about' className='relative w-full py-24 md:py-32'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12'>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            viewport={{ once: true }}
            className='lg:col-span-6'
          >
            <div className='relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 backdrop-blur-xl'>
              <div className='absolute inset-0 opacity-90'>
                <Image
                  src={dataSite.imagesHero[1]}
                  alt='About LagoPiedra aviation experiences'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent' />
              <div className='relative p-8 md:p-10'>
                <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                  About
                </p>
                <h2 className='mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground'>
                  The team behind destination-ready aviation.
                </h2>
                <p className='mt-4 text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl'>
                  We design operations that feel effortless for guests and predictable for partners—because in aviation, clarity is a feature.
                </p>
                <div className='mt-8 flex flex-wrap gap-2'>
                  <span className='rounded-full border border-border/60 bg-secondary/25 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                    Briefings
                  </span>
                  <span className='rounded-full border border-border/60 bg-secondary/25 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                    Coordination
                  </span>
                  <span className='rounded-full border border-border/60 bg-secondary/25 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                    Guest-first
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className='lg:col-span-6 lg:pt-8'>
            <div className='flex items-end justify-between gap-6'>
              <div className='space-y-3'>
                <div className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl'>
                  <span className='h-2 w-2 rounded-full bg-primary' />
                  <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                    Operating Principles
                  </span>
                </div>
                <p className='text-lg md:text-xl font-semibold tracking-tight text-foreground'>
                  Precision, without the bureaucracy.
                </p>
              </div>
              <Link href='/services' className='shrink-0 hidden sm:block'>
                <Button
                  variant='outline'
                  className='h-11 rounded-2xl border-border/70 bg-background/20 px-5 font-semibold hover:bg-secondary/70'
                >
                  Explore Services <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </div>

            <div className='mt-10 relative'>
              <div className='absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border/60 to-transparent' />
              <div className='grid gap-4'>
                {[
                  {
                    title: 'Scenic Route Curation',
                    desc: 'Flight experiences designed around iconic views and guest comfort.',
                  },
                  {
                    title: 'Event-Day Execution',
                    desc: 'Flyovers and aerial performances aligned to your program timing.',
                  },
                  {
                    title: 'Safety & Compliance',
                    desc: 'Briefings, coordination, and operational controls that put safety first.',
                  },
                  {
                    title: 'Partner Coordination',
                    desc: 'Smooth collaboration with venues, tourism teams, and local stakeholders.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className='relative pl-10'
                  >
                    <div className='absolute left-0 top-4 h-6 w-6 rounded-2xl border border-border/70 bg-secondary/30 text-primary flex items-center justify-center text-xs font-semibold'>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className='rounded-3xl border border-border/60 bg-background/25 p-6 backdrop-blur-xl'>
                      <p className='text-base font-semibold text-foreground'>{item.title}</p>
                      <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className='mt-8 sm:hidden'>
              <Link href='/services'>
                <Button className='h-12 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]'>
                  Explore Services <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
