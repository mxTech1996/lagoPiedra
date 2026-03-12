'use client';

import React from 'react';
import { motion } from 'framer-motion';

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We align on destination, audience, timing, and the experience you want to create.',
  },
  {
    number: '02',
    title: 'Safety & Permits',
    description: 'We map requirements, documentation, and operational controls for your destination.',
  },
  {
    number: '03',
    title: 'Flight Plan',
    description: 'We design routes, timing, and coordination points with your venue and partners.',
  },
  {
    number: '04',
    title: 'Execution Day',
    description: 'Our crew runs briefings and executes the plan with disciplined, guest-ready operations.',
  },
  {
    number: '05',
    title: 'Wrap-Up',
    description: 'We debrief, capture learnings, and support next steps for future activations.',
  },
];

export function OurProcessSection() {
  return (
    <section className='relative w-full py-24 md:py-32'>
      <div className='container mx-auto px-6'>
        <div className='mx-auto max-w-3xl text-center space-y-5'>
          <div className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl'>
            <span className='h-2 w-2 rounded-full bg-primary' />
            <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
              Flight Path
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground'>
            A process designed to stay calm under pressure.
          </h2>
          <p className='text-sm md:text-base leading-relaxed text-muted-foreground'>
            We keep safety, timing, and guest experience aligned—before, during, and after the activation.
          </p>
        </div>

        <div className='mt-12 relative'>
          <div className='absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/45 via-border/60 to-transparent md:left-1/2 md:-translate-x-1/2' />

          <div className='grid gap-6 md:gap-8'>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5, ease: 'easeOut' }}
                className='relative'
              >
                {(() => {
                  const isLeft = index % 2 === 0;
                  return (
                <div className='flex items-start gap-4 md:gap-8 md:items-stretch md:justify-between'>
                  <div className='relative z-10 mt-2 h-10 w-10 shrink-0 rounded-2xl border border-border/70 bg-secondary/30 text-primary flex items-center justify-center text-xs font-semibold md:order-2 md:mx-auto'>
                    {step.number}
                  </div>

                  <div
                    className={[
                      'w-full md:w-[calc(50%-2.5rem)]',
                      isLeft ? 'md:order-1 md:text-right' : 'md:order-3',
                    ].join(' ')}
                  >
                    <div className='rounded-3xl border border-border/60 bg-background/25 p-6 backdrop-blur-xl'>
                      <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                        {step.title}
                      </p>
                      <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={[
                      'hidden md:block md:w-[calc(50%-2.5rem)]',
                      isLeft ? 'md:order-3' : 'md:order-1',
                    ].join(' ')}
                  />
                </div>
                  );
                })()}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
