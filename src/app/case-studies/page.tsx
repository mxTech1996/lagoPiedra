'use client';

import { motion } from 'framer-motion';
import { caseStudies } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function CaseStudiesPage() {
  return (
    <div className='w-full min-h-screen pt-32 pb-20 relative overflow-hidden'>
      <div className='container relative z-10 mx-auto px-6'>
        <div className='mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl'
          >
            <span className='h-2 w-2 rounded-full bg-accent' />
            <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
              Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className='mt-8 text-4xl md:text-6xl font-semibold tracking-tight text-foreground'
          >
            Featured Activations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className='mt-6 mx-auto max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground'
          >
            Explore how our aviation services and aerial shows elevate tourism destinations through safe, coordinated execution.
          </motion.p>
        </div>

        {/* Case Studies Grid */}
        <motion.section
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='mt-14 pb-24 md:pb-32'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
              <motion.div
                key={index}
                variants={itemVariants}
                className='group relative'
              >
                <div className='relative h-full flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/25 backdrop-blur-xl transition-all hover:bg-background/35'>
                  <div className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_60%)]' />
                  {/* Icon Section */}
                  <div className='relative h-56 overflow-hidden flex items-center justify-center'>
                    <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_60%)] opacity-60' />
                    <div className='absolute top-5 right-5 rounded-full border border-border/60 bg-background/25 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground backdrop-blur-sm z-10'>
                      Case {String(index + 1).padStart(2, '0')}
                    </div>
                    <Icon className='w-28 h-28 text-muted-foreground/40 group-hover:text-primary transition-colors duration-500 relative' />
                  </div>

                  {/* Content Section */}
                  <div className='relative flex-1 p-7 md:p-8 flex flex-col'>
                    <div className='mb-6'>
                      <h3 className='text-2xl font-semibold tracking-tight text-foreground'>
                        {study.title}
                      </h3>
                      <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                        {study.description}
                      </p>
                    </div>

                    <div className='mt-auto pt-6 border-t border-border/60 flex flex-wrap gap-2'>
                      {study.results.map((result, i) => (
                        <span
                          key={i}
                          className='inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/25 px-3 py-1.5 text-xs font-medium text-foreground'
                        >
                          <span className='h-1.5 w-1.5 rounded-full bg-primary' />
                          <span className='text-muted-foreground'>{result.label}:</span> {result.value}
                        </span>
                      ))}
                    </div>
                    
                    <div className="absolute top-6 left-6 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
