'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { CartContext } from 'ui-old-version';
import { dataSite } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

export function PackagesSection() {
  const products = dataSite.products;
  const mainProducts = products.filter((p: any) => p.price >= 50);
  const additionalProducts = products.filter((p: any) => p.price < 50);
  
  const pathname = usePathname();
  // Safe destructuring with fallback
  const cartContext = useContext(CartContext);
  const handleAddOrRemoveProduct = cartContext?.handleAddOrRemoveProduct || (() => {});
  const validateProductInCart = cartContext?.validateProductInCart || (() => false);
  
  const isProducts = pathname === '/products';
  const router = useRouter();

  const renderProductCard = (product: any, index: number) => {
    const isInCart = validateProductInCart(product.id);
    
    const handleAction = () => {
       if (isProducts) {
         handleAddOrRemoveProduct(product.id);
       } else {
         router.push('/contact');
       }
    };

    return (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="group relative flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
           {product.image && (
             <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
           )}
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
           <div className="flex justify-between items-start mb-4 gap-4">
             <h3 className="font-semibold text-lg text-slate-900">{product.name}</h3>
             <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded text-sm">${product.price}</span>
           </div>
           <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{product.description}</p>
           
           <Button 
             onClick={handleAction}
             variant={isInCart ? "secondary" : "default"}
             className="w-full gap-2"
           >
             {isProducts ? (isInCart ? <><Check className="w-4 h-4" /> Selected</> : "Select Experience") : "Request Info"}
             {!isInCart && <ArrowRight className="w-4 h-4" />}
           </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
           <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-900 shadow-sm">
             Experience Catalog
           </div>
           <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
             Curated Aerial Experiences
           </h2>
           <p className="text-lg text-slate-600 max-w-2xl">
             Explore flight tours, event flyovers, and production support designed for tourism destinations.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {mainProducts.map((product, index) => renderProductCard(product, index))}
        </div>

        {additionalProducts.length > 0 && (
          <>
            <div className="flex flex-col items-center text-center mb-12 space-y-4">
               <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-900 shadow-sm">
                 Add-Ons
               </div>
               <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                 Operational Support
               </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalProducts.map((product, index) => renderProductCard(product, index))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
