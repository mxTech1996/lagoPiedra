'use client';

import { Logo } from '@/components/logo';
import Link from 'next/link';
import { dataSite } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className='w-full bg-slate-900 text-white border-t border-slate-800'>
      <div className='container mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-16'>
          
          {/* Brand Column */}
          <div className='col-span-1 md:col-span-1 space-y-6'>
            <div className="flex items-center gap-2">
              <div className="bg-white p-1 rounded-md">
                <Logo className="w-8 h-8" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">{dataSite.shortName}</span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Aviation services and aerial experiences for tourism destinations. Delivering safe, coordinated flights and show-ready operations since 2024.
            </p>
          </div>

          {/* Navigation */}
          <div className='col-span-1'>
            <h3 className='text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6'>Navigation</h3>
            <ul className='space-y-4'>
              {dataSite.navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className='text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2 group'
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className='col-span-1'>
            <h3 className='text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6'>Contact</h3>
            <ul className='space-y-4'>
              <li>
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <a href={`mailto:${dataSite.email}`} className='text-sm font-medium text-white hover:text-accent transition-colors'>
                  {dataSite.email}
                </a>
              </li>
              <li>
                <p className="text-xs text-slate-500 mb-1">Phone</p>
                <p className='text-sm font-medium text-white'>
                  {dataSite.telephone}
                </p>
              </li>
              <li>
                <p className="text-xs text-slate-500 mb-1">Address</p>
                <p className='text-sm font-medium text-white text-balance'>
                  {dataSite.address}
                </p>
              </li>
            </ul>
          </div>

          {/* Legal/Links */}
          <div className='col-span-1'>
            <h3 className='text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6'>Legal</h3>
            <ul className='space-y-4'>
              <li><Link href='/pdf/TYC.pdf' target='_blank' className='text-sm font-medium text-slate-300 hover:text-white transition-colors'>Terms & Conditions</Link></li>
              <li><Link href='/pdf/AP.pdf' target='_blank' className='text-sm font-medium text-slate-300 hover:text-white transition-colors'>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-xs text-slate-500'>
            © {new Date().getFullYear()} {dataSite.name}. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
