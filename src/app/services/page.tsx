'use client';

import { motion } from 'framer-motion';
import { dataSite } from '@/lib/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function ServicesPage() {
  const services = dataSite.services;

  return (
    <div className='w-full min-h-screen pt-32 pb-16 bg-slate-50 relative overflow-hidden'>
      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        <div className='flex flex-col items-center text-center mb-20 max-w-4xl mx-auto'>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-6"
            >
              <span className='text-sm font-semibold uppercase tracking-widest text-primary'>What We Do</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6'
            >
              Our Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl'
            >
              Aviation services for tourism destinations—scenic flights, aerial shows, and operational support designed for guest-ready execution.
            </motion.p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className='group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-100'
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur text-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full">
                      0{index + 1}
                    </div>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className='object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-300" />
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className='text-2xl font-bold text-slate-900 mb-4'>
                        {service.title}
                      </h3>
                      <p className='text-base text-slate-600 leading-relaxed'>
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                       <div className="p-2 text-primary group-hover:translate-x-1 transition-transform duration-300">
                         <ArrowUpRight className="w-6 h-6" />
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
