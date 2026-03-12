'use client'

import { PackagesSection } from '@/components/home/packages-section';

import { motion } from 'framer-motion'

export default function ProductsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <PackagesSection />
    </motion.div>
  )
}
