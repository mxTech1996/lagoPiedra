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
    <section className='py-24 bg-slate-50'>
      <div className='container mx-auto px-4 md:px-6'>
        
        <div className='mb-24 text-center max-w-3xl mx-auto space-y-4'>
           <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm">
             How We Work
           </div>
           
           <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-slate-900'>
             Delivering Every Flight with Clarity
           </h2>
           
           <p className='text-lg text-slate-600 leading-relaxed'>
             A simple process that keeps safety, timing, and guest experience aligned from planning to execution.
           </p>
        </div>

        <div className='relative'>
          {/* Connecting Line (Desktop) */}
          <div className='absolute top-12 left-0 w-full h-px bg-slate-200 hidden lg:block' />

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8'>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                className='relative group'
              >
                {/* Step Circle */}
                <div className='w-24 h-24 bg-white rounded-full border border-slate-200 flex items-center justify-center mb-8 mx-auto relative z-10 shadow-sm group-hover:border-primary group-hover:shadow-md transition-all duration-300'>
                   <span className='text-xl font-bold font-mono text-slate-400 group-hover:text-primary transition-colors'>
                     {step.number}
                   </span>
                </div>

                <div className='text-center space-y-3 px-4'>
                  <h3 className='text-lg font-semibold text-slate-900'>
                    {step.title}
                  </h3>
                  <p className='text-sm text-slate-600 leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
