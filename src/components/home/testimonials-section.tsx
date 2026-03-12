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
    <section id='testimonials' className='py-24 bg-slate-50'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className='lg:w-1/3 space-y-6'>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm">
              Client Voices
            </div>
            
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-slate-900'>
              Trusted by Industry Leaders
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed">
              From scenic flights to event-day flyovers, hear what partners say about working with LagoPiedra.
            </p>

            <div className="flex gap-4 pt-4">
               <Button 
                 variant="outline"
                 size="icon"
                 onClick={prevTestimonial}
                 className="rounded-full w-12 h-12 border-slate-200 hover:bg-slate-100"
               >
                 <ArrowLeft className="w-5 h-5 text-slate-900" />
               </Button>
               <Button 
                 variant="default"
                 size="icon"
                 onClick={nextTestimonial}
                 className="rounded-full w-12 h-12"
               >
                 <ArrowRight className="w-5 h-5" />
               </Button>
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <div className='relative w-full h-full p-8 md:p-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between'>
                    <div className="absolute top-8 right-8 text-slate-100">
                       <Quote className="w-16 h-16 opacity-50" />
                    </div>

                    <div>
                      <div className='flex gap-1 mb-6'>
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      
                      <p className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed mb-8 relative z-10">
                        &quot;{testimonials[currentIndex].content}&quot;
                      </p>
                    </div>

                    <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                       <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-lg text-slate-600">
                          {testimonials[currentIndex].name[0]}
                       </div>
                       <div>
                          <div className="font-semibold text-slate-900">{testimonials[currentIndex].name}</div>
                          <div className="text-sm text-slate-500">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</div>
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
