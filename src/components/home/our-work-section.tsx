'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function OurWorkSection() {
  return (
    <section id='our-work' className='relative w-full py-24 md:py-32'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-8'>
          <div className='max-w-2xl space-y-5'>
            <div className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl'>
              <span className='h-2 w-2 rounded-full bg-accent' />
              <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                Portfolio
              </span>
            </div>
            <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground'>
              Proof that the details matter.
            </h2>
            <p className='text-sm md:text-base leading-relaxed text-muted-foreground'>
              A snapshot of activations where timing, coordination, and guest experience needed to be perfect.
            </p>
          </div>

          <div className='hidden md:block'>
            <Link href='/case-studies'>
              <Button
                variant='outline'
                className='h-12 rounded-2xl border-border/70 bg-background/20 px-6 font-semibold hover:bg-secondary/70'
              >
                View Full Portfolio <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>

        <div className='mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5, ease: 'easeOut' }}
                className='group relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 backdrop-blur-xl transition-all hover:bg-background/35'
              >
                <div className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.16),transparent_60%)]' />
                <div className='relative p-7 md:p-8 flex flex-col h-full'>
                  <div className='flex items-start justify-between gap-6'>
                    <div className='h-12 w-12 rounded-2xl border border-border/60 bg-secondary/30 flex items-center justify-center text-primary'>
                      <Icon className='h-6 w-6' />
                    </div>
                    <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                      Case {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className='mt-6 text-xl font-semibold tracking-tight text-foreground'>
                    {study.title}
                  </h3>
                  <p className='mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3'>
                    {study.description}
                  </p>

                  <div className='mt-6 flex flex-wrap gap-2'>
                    {study.results.map((result, i) => (
                      <span
                        key={i}
                        className='rounded-full border border-border/60 bg-secondary/25 px-3 py-1.5 text-xs font-medium text-foreground'
                      >
                        <span className='text-muted-foreground'>{result.label}:</span> {result.value}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href='/case-studies'
                  className='absolute inset-0 z-20'
                  aria-label={`View portfolio item ${study.title}`}
                />
              </motion.div>
            );
          })}
        </div>

        <div className='mt-10 md:hidden'>
          <Link href='/case-studies'>
            <Button className='h-12 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]'>
              View Full Portfolio <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
