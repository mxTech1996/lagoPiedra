'use client';

import { motion } from 'framer-motion';
import { features } from '@/lib/data';

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
           <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-32">
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm">
                Why Choose Us
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                The LagoPiedra Standard
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Aviation is built on discipline. We bring that mindset to every destination flight, show, and guest experience.
              </p>
           </div>

           <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                 const Icon = feature.icon;
                 return (
                   <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="group p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                   >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-2xl font-bold text-slate-100 group-hover:text-slate-200 transition-colors">0{index + 1}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                   </motion.div>
                 )
              })}
           </div>
        </div>

      </div>
    </section>
  );
}
