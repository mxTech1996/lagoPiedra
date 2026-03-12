'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function OurWorkSection() {
  return (
    <section id='our-work' className='py-24 bg-slate-50'>
      <div className='container mx-auto px-4 md:px-6'>
        
        <div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-8'>
          <div className='space-y-4 max-w-2xl'>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm">
               Portfolio Highlights
            </div>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-slate-900'>
              Featured Activations
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              A look at how our aviation services and aerial shows elevate tourism destinations.
            </p>
         </div>
         <div className="hidden md:block">
            <Link href="/case-studies">
              <Button variant="outline" className="gap-2">
                View Full Portfolio <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
         </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                className='group relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden'
              >
                <div className="p-8 flex-1 flex flex-col h-full">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-sm font-medium text-slate-400">0{index + 1}</span>
                   </div>

                   <div className="mb-8">
                     <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                       {study.title}
                     </h3>
                     <p className="text-slate-600 leading-relaxed line-clamp-3">
                       {study.description}
                     </p>
                   </div>

                   <div className="mt-auto pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                     {study.results.slice(0, 2).map((result, i) => (
                       <div key={i} className="flex flex-col">
                          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                            {result.label}
                          </span>
                          <span className="text-lg font-bold text-slate-900">
                            {result.value}
                          </span>
                       </div>
                     ))}
                   </div>
                </div>

                <Link href="/case-studies" className="absolute inset-0 z-20" aria-label={`View project ${study.title}`} />
              </motion.div>
            )
          })}
        </div>
        
        <div className="mt-12 md:hidden">
            <Link href="/case-studies">
                <Button variant="outline" className="w-full gap-2">
                    View Full Portfolio <ArrowRight className="w-4 h-4" />
                </Button>
            </Link>
        </div>

      </div>
    </section>
  );
}
