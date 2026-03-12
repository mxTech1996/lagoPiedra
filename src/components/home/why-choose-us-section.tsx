'use client';

import { motion } from 'framer-motion';
import { features } from '@/lib/data';

export function WhyChooseUsSection() {
  return (
    <section className='relative w-full py-24 md:py-32'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12'>
          <div className='lg:col-span-5 space-y-6'>
            <div className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl'>
              <span className='h-2 w-2 rounded-full bg-primary' />
              <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                Why LagoPiedra
              </span>
            </div>

            <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground'>
              The standard that makes operations feel effortless.
            </h2>

            <p className='text-sm md:text-base leading-relaxed text-muted-foreground'>
              Aviation is built on discipline. We bring that mindset to every destination flight, aerial show, and partner experience.
            </p>

            <div className='rounded-3xl border border-border/60 bg-background/25 p-6 md:p-8 backdrop-blur-xl'>
              <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                What you get
              </p>
              <div className='mt-5 grid grid-cols-1 gap-3'>
                {[
                  'Clear planning and timelines',
                  'Guest-ready briefing flow',
                  'Event-day coordination discipline',
                  'Consistent communication with partners',
                ].map((line) => (
                  <div
                    key={line}
                    className='rounded-2xl border border-border/60 bg-secondary/25 px-4 py-3 text-sm font-medium text-foreground'
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='lg:col-span-7'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className='group relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 p-6 md:p-8 backdrop-blur-xl transition-all hover:bg-background/35'
                  >
                    <div className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_60%)]' />
                    <div className='relative flex items-start justify-between gap-6'>
                      <div className='space-y-3'>
                        <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                          Standard {String(index + 1).padStart(2, '0')}
                        </p>
                        <h3 className='text-lg md:text-xl font-semibold tracking-tight text-foreground'>
                          {feature.title}
                        </h3>
                      </div>
                      <div className='h-12 w-12 rounded-2xl border border-border/60 bg-secondary/30 flex items-center justify-center text-primary'>
                        <Icon className='h-6 w-6' />
                      </div>
                    </div>
                    <p className='relative mt-4 text-sm leading-relaxed text-muted-foreground'>
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
