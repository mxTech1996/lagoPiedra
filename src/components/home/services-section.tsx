'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Camera, Headset, MapPin, PlaneTakeoff, ShieldCheck, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    icon: <PlaneTakeoff className="w-6 h-6" />,
    title: 'Scenic Flight Tours',
    description: 'Curated routes over iconic landscapes designed for tourism destinations and private groups.',
  },
  {
    icon: <Ticket className="w-6 h-6" />,
    title: 'Aerial Shows & Flyovers',
    description: 'Event-ready aerial experiences for festivals, beachfront activations, and destination launches.',
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: 'Aerial Photo & Film',
    description: 'Flight operations tailored to shot lists, stabilized passes, and golden-hour capture.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Safety & Permits',
    description: 'Planning support, operational controls, and documentation assistance based on destination requirements.',
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Destination Coordination',
    description: 'On-the-ground coordination with venues, tourism partners, and event teams for smooth execution.',
  },
  {
    icon: <Headset className="w-6 h-6" />,
    title: 'Guest Experience Support',
    description: 'Guest-ready briefings, schedule coordination, and concierge-friendly planning for premium tourism.',
  },
];

export function ServicesSection() {
  return (
    <section id='services' className='relative w-full py-24 md:py-32'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12'>
          <div className='lg:col-span-4 lg:sticky lg:top-28 space-y-6'>
            <div className='inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl'>
              <span className='h-2 w-2 rounded-full bg-primary' />
              <span className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                Capabilities
              </span>
            </div>

            <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-foreground'>
              Aviation services built for destinations.
            </h2>

            <p className='text-sm md:text-base leading-relaxed text-muted-foreground'>
              We blend guest experience with operational discipline—routes, shows, and support designed to run cleanly under pressure.
            </p>

            <Link href='/services'>
              <Button className='h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]'>
                View All Services <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>

          <div className='lg:col-span-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className='group relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 p-6 md:p-8 backdrop-blur-xl transition-all hover:bg-background/35'
                >
                  <div className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_60%)]' />

                  <div className='relative flex items-start justify-between gap-6'>
                    <div className='space-y-3'>
                      <p className='text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground'>
                        Module {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className='text-xl font-semibold tracking-tight text-foreground'>
                        {service.title}
                      </h3>
                    </div>
                    <div className='shrink-0'>
                      <div className='h-12 w-12 rounded-2xl border border-border/60 bg-secondary/30 flex items-center justify-center text-primary'>
                        {service.icon}
                      </div>
                    </div>
                  </div>

                  <p className='relative mt-4 text-sm leading-relaxed text-muted-foreground'>
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
