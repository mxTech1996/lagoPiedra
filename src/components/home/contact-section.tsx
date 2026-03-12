'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { dataSite } from '@/lib/data';

export function ContactSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          
          <div className="max-w-2xl space-y-8">
            <div className='inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-900 shadow-sm'>
              Contact
            </div>
            
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-slate-900'>
              Let&apos;s Plan Your Next Flight Experience
            </h2>
            
            <p className='text-lg text-slate-600 leading-relaxed'>
              Tell us your destination, dates, and goals. We&apos;ll propose a safe, guest-ready plan for flights, shows, or production support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto gap-2"
                >
                  Request a Proposal <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <Link href={`mailto:${dataSite.email}`} className="w-full sm:w-auto">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full sm:w-auto"
                >
                  Email Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col gap-6">
             <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm min-w-[320px] space-y-8">
                <div className="flex items-start gap-5">
                   <div className="p-3 bg-white rounded-lg border border-slate-200 text-primary shadow-sm">
                     <Mail className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Email</p>
                      <a href={`mailto:${dataSite.email}`} className="text-lg font-semibold text-slate-900 hover:text-primary transition-colors break-all">
                        {dataSite.email}
                      </a>
                   </div>
                </div>

                <div className="w-full h-px bg-slate-200" />

                <div className="flex items-start gap-5">
                   <div className="p-3 bg-white rounded-lg border border-slate-200 text-primary shadow-sm">
                     <Phone className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Phone</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {dataSite.telephone}
                      </p>
                   </div>
                </div>

                <div className="w-full h-px bg-slate-200" />
                
                <div className="flex items-start gap-5">
                   <div className="p-3 bg-white rounded-lg border border-slate-200 text-primary shadow-sm">
                     <MapPin className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Location</p>
                      <p className="text-lg font-semibold text-slate-900 max-w-[250px]">
                        {dataSite.address}
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
