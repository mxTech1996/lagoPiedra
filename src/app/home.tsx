'use client';

import { AboutUsSection } from '@/components/home/about-us-section';
import { ContactSection } from '@/components/home/contact-section';
import { HeroSection } from '@/components/home/hero-section';
import { ServicesSection } from '@/components/home/services-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { PackagesSection } from '@/components/home/packages-section';
import { WhyChooseUsSection } from '@/components/home/why-choose-us-section';
import { OurProcessSection } from '@/components/home/our-process-section';
import { OurWorkSection } from '@/components/home/our-work-section';

export default function Home() {
  return (
    <div className='flex w-full flex-col min-h-dvh'>
      <main className='flex-1'>
        <HeroSection />
        <ServicesSection />
        <OurWorkSection />
        <AboutUsSection />
        <PackagesSection />
        <OurProcessSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
}
