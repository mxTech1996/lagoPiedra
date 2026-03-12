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
        className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 backdrop-blur-xl transition-all hover:bg-background/35"
      >
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_60%)]" />

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />

            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-border/60 bg-background/25 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-white backdrop-blur">
              ${product.price} USD
            </div>

            {isInCart && (
              <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-primary backdrop-blur">
                <Check className="h-4 w-4" />
                Selected
              </div>
            )}
          </div>

          <div className="p-6 md:p-7 flex flex-col">
            <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
              {product.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-grow">
              {product.description}
            </p>

            <div className="mt-6">
              <Button
                onClick={handleAction}
                variant={isInCart ? "secondary" : "default"}
                className="w-full h-12 rounded-2xl gap-2 font-semibold"
              >
                {isProducts ? (isInCart ? <>Selected</> : "Select Experience") : "Request Info"}
                {!isInCart && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full py-24 md:py-32">
      <div className="container mx-auto px-6">
        
        <div className="mx-auto max-w-3xl text-center space-y-5 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Experiences
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Curated Aerial Experiences
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            Choose a flight experience or event package, then add operational support when needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-14 md:mb-20">
          {mainProducts.map((product, index) => renderProductCard(product, index))}
        </div>

        {additionalProducts.length > 0 && (
          <>
            <div className="mx-auto max-w-3xl text-center space-y-5 mb-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  Add-ons
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                Operational Support
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {additionalProducts.map((product, index) => renderProductCard(product, index))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
