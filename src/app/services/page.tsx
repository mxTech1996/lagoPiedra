'use client';

import { motion } from 'framer-motion';
import { dataSite } from '@/lib/data';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function ServicesPage() {
  const services = dataSite.services;

  return (
    <div className='w-full min-h-screen pt-32 pb-20 relative overflow-hidden'>
      <div className='container mx-auto px-6 relative z-10'>
        <div className='mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl'
          >
            <span className='h-2 w-2 rounded-full bg-primary' />
            <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
              Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className='mt-8 text-4xl md:text-6xl font-semibold tracking-tight text-foreground'
          >
            Aviation services built for destinations.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className='mt-6 mx-auto max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground'
          >
            Scenic flights, aerial shows, and operational support designed for guest-ready execution and event-day clarity.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className='mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className='group relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 backdrop-blur-xl transition-all hover:bg-background/35'
              >
                <div className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_60%)]' />

                <div className='relative'>
                  <div className='relative h-56 overflow-hidden'>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className='object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent' />
                    <div className='absolute left-5 top-5 rounded-full border border-border/60 bg-background/25 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground backdrop-blur'>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className='p-7 md:p-8'>
                    <div className='flex items-start justify-between gap-6'>
                      <div>
                        <h3 className='text-xl md:text-2xl font-semibold tracking-tight text-foreground'>
                          {service.title}
                        </h3>
                        <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                          {service.description}
                        </p>
                      </div>
                      <div className='h-11 w-11 shrink-0 rounded-2xl border border-border/60 bg-secondary/25 text-primary flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1'>
                        <ArrowUpRight className='h-5 w-5' />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
