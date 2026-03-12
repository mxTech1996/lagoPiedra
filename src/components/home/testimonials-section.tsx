'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/lib/data';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id='testimonials' className='relative w-full py-24 md:py-32'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12'>
          <div className='lg:col-span-4 space-y-6'>
            <div className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl'>
              <span className='h-2 w-2 rounded-full bg-accent' />
              <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                Testimonials
              </span>
            </div>

            <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground'>
              Partners who care about the details.
            </h2>

            <p className='text-sm md:text-base leading-relaxed text-muted-foreground'>
              From scenic flights to event-day flyovers, hear what partners say about working with LagoPiedra.
            </p>

            <div className='flex gap-3 pt-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={prevTestimonial}
                className='h-12 w-12 rounded-2xl border-border/70 bg-background/20 hover:bg-secondary/70'
              >
                <ArrowLeft className='h-5 w-5' />
              </Button>
              <Button
                size='icon'
                onClick={nextTestimonial}
                className='h-12 w-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_35px_rgba(56,189,248,0.25)]'
              >
                <ArrowRight className='h-5 w-5' />
              </Button>
            </div>
          </div>

          <div className='lg:col-span-8'>
            <div className='relative min-h-[360px]'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className='absolute inset-0'
                >
                  <div className='relative h-full overflow-hidden rounded-3xl border border-border/60 bg-background/25 p-8 md:p-12 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]'>
                    <div className='absolute -top-10 -right-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl' />
                    <div className='absolute top-8 right-8 text-muted opacity-50'>
                      <Quote className='h-14 w-14' />
                    </div>

                    <div className='relative'>
                      <div className='flex gap-1'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={[
                              'h-5 w-5',
                              i < testimonials[currentIndex].rating
                                ? 'fill-accent text-accent'
                                : 'text-muted-foreground/30',
                            ].join(' ')}
                          />
                        ))}
                      </div>

                      <p className='mt-8 text-xl md:text-2xl font-semibold tracking-tight text-foreground leading-relaxed max-w-3xl'>
                        &quot;{testimonials[currentIndex].content}&quot;
                      </p>
                    </div>

                    <div className='mt-10 flex items-center justify-between gap-6 border-t border-border/60 pt-8'>
                      <div className='flex items-center gap-4'>
                        <div className='h-12 w-12 rounded-2xl border border-border/60 bg-secondary/25 flex items-center justify-center text-base font-semibold text-foreground'>
                          {testimonials[currentIndex].name[0]}
                        </div>
                        <div>
                          <div className='text-sm font-semibold text-foreground'>
                            {testimonials[currentIndex].name}
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                          </div>
                        </div>
                      </div>
                      <div className='hidden sm:block rounded-full border border-border/60 bg-secondary/25 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                        Verified Partner
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
