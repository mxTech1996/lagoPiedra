'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { dataSite } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className='relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background'>
      <div className='container mx-auto px-6 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Est. 2024 — Tourism Aviation
              </span>
            </div>
            
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-8 leading-[0.9]'>
              Aviation <span className="text-muted-foreground font-normal italic">&</span><br />
              Aerial Shows.
            </h1>
            
            <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10'>
              {dataSite.description} From scenic routes to event-day flyovers, we handle planning, coordination, and execution with a guest-first mindset.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 w-full justify-center'>
              <Link href='/products'>
                <Button size="lg" className='h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium shadow-sm transition-transform hover:scale-105'>
                  Explore Experiences
                </Button>
              </Link>
              <Link href='/contact'>
                <Button variant='outline' size="lg" className='h-12 px-8 rounded-full border-border hover:bg-secondary text-base font-medium transition-transform hover:scale-105'>
                  Request a Proposal
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Minimalist Visual Grid - Split Layout */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-4 md:h-[600px]">
          
          {/* Primary View - Wide */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            className="md:col-span-8 relative h-[300px] md:h-full rounded-lg overflow-hidden group"
          >
            <Image
              src={dataSite.imagesHero[0]}
              alt="Aerial view over a tourism coastline"
              fill
              className='object-cover grayscale group-hover:grayscale-0 transition-all duration-700'
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
            
            {/* Technical Overlay 1 */}
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1">
               <span className="text-[10px] font-mono text-white/90 tracking-widest">FLIGHT_FEED_01 // WIDE</span>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/10 bg-black/40 backdrop-blur-md flex justify-between items-end text-white/80 font-mono text-xs md:text-sm">
               <div>
                  <p className="text-white font-semibold">AIRSPACE_OVERVIEW</p>
                  <p className="text-white/60 text-[10px]">STATUS: READY</p>
               </div>
               <div className="text-right hidden sm:block">
                  <p>WIND: 8kt</p>
                  <p>VIS: 10km+</p>
               </div>
            </div>
          </motion.div>

          {/* Secondary View - Detail/Vertical */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
            className="md:col-span-4 relative h-[300px] md:h-full rounded-lg overflow-hidden group"
          >
            <Image
              src={dataSite.imagesHero[1]}
              alt="Aircraft detail over a tourism destination"
              fill
              className='object-cover grayscale group-hover:grayscale-0 transition-all duration-700'
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
             
            {/* Technical Overlay 2 */}
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1">
               <span className="text-[10px] font-mono text-white/90 tracking-widest">FLIGHT_FEED_02 // DETAIL</span>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
               <div className="font-mono text-xs text-white/80 space-y-1">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span>ALT</span>
                    <span>1,200ft</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1 pt-1">
                    <span>SPEED</span>
                    <span>95kt</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>ETA</span>
                    <span>06:40</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/5 opacity-20 blur-[100px]"></div>
    </section>
  );
}
