'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { dataSite } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AboutUsSection() {
  return (
    <section id='about' className='py-32 bg-background relative border-t border-border'>
      <div className='container mx-auto px-6'>
        
        {/* Section Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
                001 / About LagoPiedra
              </span>
              <h2 className='text-4xl md:text-5xl font-semibold tracking-tight text-foreground'>
                Elevating destinations through <br/>
                <span className="text-muted-foreground italic font-normal">calculated precision.</span>
              </h2>
           </div>
           <div className="hidden md:block h-px flex-1 bg-border mx-12 mb-4" />
           <Link href="/services">
              <Button variant="ghost" className="group text-base">
                Explore Services <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
           </Link>
        </div>

        {/* Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24'>
          
          {/* Left Column - Image Composition */}
          <div className='lg:col-span-5 relative'>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              viewport={{ once: true }}
              className='relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-secondary'
            >
              <Image
                src={dataSite.imagesHero[1]}
                alt="About LagoPiedra aviation experiences"
                fill
                className='object-cover grayscale hover:grayscale-0 transition-all duration-700'
              />
              {/* Technical Overlay */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-mono border border-black/5">
                IMG_REF: A-04
              </div>
            </motion.div>
          </div>

          {/* Right Column - Text & Process */}
          <div className='lg:col-span-7 flex flex-col justify-center space-y-12'>
            
            <div className="space-y-6">
               <h3 className="text-2xl font-medium text-foreground">Built for Tourism Aviation</h3>
               <p className='text-lg text-muted-foreground leading-relaxed'>
                At {dataSite.name}, we deliver aviation services and aerial shows designed for tourism destinations. We combine precise planning, clear coordination, and operational discipline so your guests enjoy an unforgettable experience—smoothly and responsibly.
               </p>
            </div>

            <div className="h-px w-full bg-border" />

            {/* Organizational List */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10'>
              {[
                { title: "Scenic Route Curation", desc: "Flight experiences designed around iconic views and guest comfort." },
                { title: "Event-Day Execution", desc: "Flyovers and aerial performances aligned to your program timing." },
                { title: "Safety & Compliance", desc: "Briefings, coordination, and operational controls that put safety first." },
                { title: "Partner Coordination", desc: "Smooth collaboration with venues, tourism teams, and local stakeholders." }
              ].map((item, i) => (
                <div key={i} className='group'>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono text-xs text-primary/40">0{i + 1}</span>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-7 border-l border-border group-hover:border-primary/30 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
