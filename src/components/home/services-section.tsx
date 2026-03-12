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
    <section id='services' className='py-24 bg-slate-50'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6'>
          <div className='max-w-2xl'>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              What We Do
            </div>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4'>
              Aviation Services for Tourism Destinations
            </h2>
            <p className='text-lg text-slate-600 leading-relaxed'>
              From scenic flights to aerial shows, we deliver safe, coordinated operations built around guest experience and event-day precision.
            </p>
          </div>
          <Link href="/services">
            <Button variant="outline" className="hidden md:flex gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className='group bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300'
            >
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className='text-xl font-semibold text-slate-900 mb-3 group-hover:text-primary transition-colors'>
                {service.title}
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <Link href="/services">
            <Button variant="outline" className="w-full gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
