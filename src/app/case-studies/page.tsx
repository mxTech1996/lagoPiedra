'use client';

import { motion } from 'framer-motion';
import { caseStudies } from '@/lib/data';
import { cn } from '@/lib/utils';
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
    <div className='w-full min-h-screen pt-32 pb-16 bg-slate-50 relative overflow-hidden'>
      <div className='container relative z-10 mx-auto px-4 md:px-6'>
        
        <div className="flex flex-col items-center text-center mb-20 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-8"
          >
            <span className='text-sm font-semibold uppercase tracking-widest text-primary'>Portfolio</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6'
          >
            Featured Activations
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl'
          >
            Explore how our aviation services and aerial shows have elevated tourism destinations through safe, coordinated execution.
          </motion.p>
        </div>

        {/* Case Studies Grid */}
        <motion.section
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='pb-24 md:pb-32'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
              <motion.div
                key={index}
                variants={itemVariants}
                className='group relative'
              >
                <div className='relative h-full flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden'>
                  {/* Icon Section */}
                  <div className='relative h-64 overflow-hidden flex items-center justify-center bg-slate-50 group-hover:bg-primary/5 transition-colors duration-500'>
                     <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-slate-900 px-3 py-1 font-semibold text-xs uppercase tracking-widest rounded-full z-10">
                        Project 0{index + 1}
                     </div>
                     
                    <Icon className='w-32 h-32 text-slate-400 group-hover:text-primary transition-colors duration-500' />
                  </div>

                  {/* Content Section */}
                  <div className='relative flex-1 p-8 md:p-10 flex flex-col'>
                    <div className='mb-8'>
                      <h3 className='text-2xl font-bold text-slate-900 mb-4'>
                        {study.title}
                      </h3>
                      <p className='text-base text-slate-600 leading-relaxed'>
                        {study.description}
                      </p>
                    </div>

                    <div className='mt-auto pt-8 border-t border-slate-100 flex flex-wrap gap-3'>
                      {study.results.map((result, i) => (
                        <div key={i} className='flex items-center gap-2 bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md border border-slate-100'>
                          <span className='w-1.5 h-1.5 bg-primary rounded-full' />
                          <span className='text-sm font-medium'>{result.label}: {result.value}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute top-6 right-6 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
