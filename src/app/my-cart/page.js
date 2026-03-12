'use client';

import { useContext, useState } from 'react';
import { CartContext } from 'ui-old-version';
import { useRouter } from 'next/navigation';
import { ApiTransaction } from '../api/api';
import { ArrowLeft, Trash2, CreditCard, Lock, ShieldCheck, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const pageName = 'LAGOPIEDRA';

const formSchema = z.object({
  firstname: z.string().min(2, 'First name is required'),
  lastname: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  street: z.string().min(5, 'Street address is required'),
  extNumber: z.string().min(1, 'External number is required'),
  codePostal: z.string().min(4, 'Zip code is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  cardNumber: z.string().min(15, 'Invalid card number').max(19),
  cardName: z.string().min(2, 'Name on card is required'),
  cardDate: z.string().length(4, 'Format: MMYY'),
  cardCvv: z.string().min(3, 'Invalid CVV').max(4),
});

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const CartPage = () => {
  const { products, getTotalCart, handleAddOrRemoveProduct,cleanCartItems } = useContext(CartContext);
  const [step, setStep] = useState('cart'); // cart | checkout | success
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [purchasedData, setPurchasedData] = useState({
    items: [],
    total: 0,
  });
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      street: '',
      extNumber: '',
      codePostal: '',
      city: '',
      state: '',
      cardNumber: '',
      cardName: '',
      cardDate: '',
      cardCvv: '',
    },
  });

  const createRandomNumberTransaction = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const extractMessage = (str) => {
    if (!str || str === '' || str === 'null' || str === undefined) {
      return 'An unexpected error occurred. Please try again later.';
    }
    const match = str.match(/message:\s*(.+)/);
    if (match) {
      return match[1];
    } else {
      return str;
    }
  };

  const sendEmail = async (
    email = '',
    phone = '',
    interProducts = [],
    idTransaction = '',
    nameCard = ''
  ) => {
    const services = interProducts?.map((item) => {
      return {
        name: item.name,
        price: parseFloat(item.price),
      };
    });
    const data = {
      email_for_admin_data: {
        client: pageName,
        email: email,
        name: nameCard,
        amount: getTotalCart(),
        phone_number: '+52' + phone,
        services: services,
        order_number: idTransaction,
        sender: 'orders@lagopiedra.aero',
      },
      email_for_client_data: {
        email: email,
      },
    };
    await ApiTransaction.sendEmail(data);
  };

  const onPaymentResult = async (data) => {
    setIsLoading(true);
    const merchantTransaction =
      pageName + '-' + createRandomNumberTransaction();

    let body = {
      merchant_transaction_id: merchantTransaction,
      card: {
        number: data.cardNumber,
        holder_name: data.cardName,
        expiration_year: data.cardDate.slice(-2),
        expiration_month: data.cardDate.substring(0, 2),
        cvv: data.cardCvv,
      },
      customer: {
        merchant_customer_id: '331415',
        first_name: data.firstname,
        second_name: '',
        first_surname: data.lastname,
        second_surname: '', // data.secondSurname not in form
        email: data.email,
        phone_number: '+52' + data.phone,
        home_address: {
          street: data.street,
          external_number: data.extNumber,
          postal_code: data.codePostal,
          colony: '',
          city: data.city,
          state_code: data.state?.slice(0, 2).toUpperCase(),
          state_name: data.state,
          country_code: 'MX',
          country_name: 'Mexico',
        },
        billing_address: {
          street: data.street,
          external_number: data.extNumber,
          postal_code: data.codePostal,
          colony: '',
          city: data.city,
          state_code: data.state?.slice(0, 2).toUpperCase(),
          state_name: data.state,
          country_code: 'MX',
          country_name: 'Mexico',
        },
        nationality: 'MX',
        gender: 'male',
      },
      amount: getTotalCart().toFixed(2),
      currency: 'USD',
      description: 'Order from LagoPiedra',
    };
    
    await sleep(2000);
    // const dataRes = await ApiTransaction.makeTransaction(body);
    const dataRes = {
      content: {
        status: 'success',
        merchant_transaction_id: merchantTransaction,
        message: {
          detail: 'Transaction completed successfully',
        },
      },
    };

    if (dataRes?.content?.status === 'success') {
      let idTransaction = dataRes?.content?.merchant_transaction_id;

      await sendEmail(
        data.email,
        data.phone,
        products,
        idTransaction,
        data.cardName
      );
      setIsLoading(false);
      setPurchasedData({
        items: [...products],
        total: getTotalCart(),
      });
      setStep('success');
      cleanCartItems();
      toast({
        title: "Order Placed Successfully!",
        description: `Transaction ID: ${idTransaction}`,
        className: "bg-green-50 text-green-900 border-green-200",
      });
    } else {
      setIsLoading(false);
      let message = extractMessage(dataRes?.content?.message?.detail);
      toast({
        title: "Transaction Failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data) => {
    onPaymentResult(data);
  };

  return (
    <main className='min-h-screen w-full pt-32 pb-20 relative overflow-hidden'>
      <div className='container mx-auto px-6 relative z-10'>
        {/* Header */}
        <div className='mb-12'>
          <Button
            onClick={() => {
              if (step === 'checkout') {
                setStep('cart');
              } else {
                router.push('/products');
              }
            }}
            variant="ghost"
            className='mb-6 hover:bg-transparent p-0 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold tracking-wide'
          >
            <ArrowLeft className="w-5 h-5" />
            {step === 'checkout' ? 'Back to Cart' : 'Continue Browsing'}
          </Button>

          <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl mb-4">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className='text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
              {step === 'cart' ? 'Your Selection' : step === 'checkout' ? 'Secure Checkout' : 'Order Complete'}
            </span>
          </div>
          <h1 className='text-4xl md:text-6xl font-semibold tracking-tight text-foreground'>
            {step === 'cart' && 'Shopping Cart'}
            {step === 'checkout' && 'Payment Details'}
            {step === 'success' && 'Thank You'}
          </h1>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {step === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className='grid lg:grid-cols-3 gap-12'
            >
              {/* Cart Items */}
              <div className='lg:col-span-2 space-y-6'>
                {products?.length === 0 ? (
                  <div className='rounded-3xl border border-border/60 bg-background/25 p-12 text-center backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]'>
                    <p className='text-xl font-semibold mb-6 text-foreground'>Your cart is empty</p>
                    <Button 
                      onClick={() => router.push('/products')}
                      className="h-12 px-8 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]"
                    >
                      Browse Experiences
                    </Button>
                  </div>
                ) : (
                  products?.map((item, index) => (
                    <div key={index} className='group flex gap-6 items-center rounded-3xl border border-border/60 bg-background/25 p-6 backdrop-blur-xl transition-all hover:bg-background/35'>
                      <div className='w-24 h-24 rounded-2xl border border-border/60 bg-secondary/25 relative flex-shrink-0 overflow-hidden'>
                        {item.image && (
                          <Image src={item.image} alt={item.name} fill className='object-cover' />
                        )}
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold mb-1 text-foreground'>{item.name}</h3>
                        <p className='text-base font-semibold text-primary'>${item.price}</p>
                      </div>
                      <Button
                        onClick={() => handleAddOrRemoveProduct(item.id)}
                        size="icon"
                        variant="ghost"
                        className='h-11 w-11 rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/15'
                      >
                        <Trash2 className='w-5 h-5' />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {/* Summary */}
              {products?.length > 0 && (
                <div className='lg:col-span-1'>
                  <div className='sticky top-32 rounded-3xl border border-border/60 bg-background/25 p-8 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]'>
                    <h3 className='text-xl font-semibold mb-6 border-b border-border/60 pb-4 text-foreground'>Order Summary</h3>
                    <div className='flex justify-between items-center mb-4'>
                      <span className='font-medium text-muted-foreground'>Subtotal</span>
                      <span className='font-semibold text-foreground'>${getTotalCart().toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between items-center mb-8 text-xl'>
                      <span className='font-semibold text-foreground'>Total</span>
                      <span className='font-bold text-primary'>${getTotalCart().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-6">
                      <Checkbox 
                        id="terms" 
                        checked={acceptedTerms}
                        onCheckedChange={setAcceptedTerms}
                        className="rounded border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                      >
                        Accept <Link href="/pdf/TYC.pdf" target="_blank" className="underline underline-offset-4 hover:text-primary transition-colors">Terms and Conditions</Link>
                      </label>
                    </div>

                    <Button 
                      onClick={() => {
                        if (!acceptedTerms) {
                          toast({
                            title: "Terms Required",
                            description: "Please accept the terms and conditions to proceed.",
                            variant: "destructive",
                          });
                          return;
                        }
                        setStep('checkout');
                      }}
                      className="w-full h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className='max-w-4xl mx-auto'
            >
              <div className='relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 p-8 md:p-12 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_60%)]' />
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='relative space-y-8'>
                    {/* Personal Info */}
                    <div>
                      <h3 className='text-lg font-semibold mb-6 flex items-center gap-3 text-foreground'>
                        <span className='bg-primary/15 text-primary w-9 h-9 flex items-center justify-center rounded-2xl text-xs font-semibold tracking-[0.18em]'>01</span>
                        Personal Details
                      </h3>
                      <div className='grid md:grid-cols-2 gap-6'>
                        <FormField
                          control={form.control}
                          name="firstname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">First Name</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Email</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Phone</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator className="bg-border/60" />

                    {/* Address */}
                    <div>
                      <h3 className='text-lg font-semibold mb-6 flex items-center gap-3 text-foreground'>
                        <span className='bg-primary/15 text-primary w-9 h-9 flex items-center justify-center rounded-2xl text-xs font-semibold tracking-[0.18em]'>02</span>
                        Shipping Address
                      </h3>
                      <div className='space-y-6'>
                        <div className='grid md:grid-cols-4 gap-6'>
                          <div className='md:col-span-3'>
                            <FormField
                              control={form.control}
                              name="street"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Street Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="extNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Ext. No.</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='grid md:grid-cols-3 gap-6'>
                          <FormField
                            control={form.control}
                            name="codePostal"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Zip Code</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">City</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">State</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-border/60" />

                    {/* Payment */}
                    <div>
                      <h3 className='text-lg font-semibold mb-6 flex items-center gap-3 text-foreground'>
                        <span className='bg-primary/15 text-primary w-9 h-9 flex items-center justify-center rounded-2xl text-xs font-semibold tracking-[0.18em]'>03</span>
                        Payment
                      </h3>
                      <div className='rounded-3xl border border-border/60 bg-secondary/20 p-6'>
                        <div className='grid gap-6'>
                           <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Card Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    {...field} 
                                    placeholder="0000 0000 0000 0000" 
                                    className="h-11 rounded-2xl border-border/70 bg-background/20 pl-12 text-foreground" 
                                    maxLength={19}
                                    onChange={(e) => {
                                      let value = e.target.value.replace(/\D/g, '');
                                      if (value.length > 16) value = value.slice(0, 16);
                                      const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                                      field.onChange(formatted);
                                    }}
                                  />
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cardName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Name on Card</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="JOHN DOE" className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className='grid grid-cols-2 gap-6'>
                            <FormField
                              control={form.control}
                              name="cardDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Expiry (MMYY)</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="1225" maxLength={4} className="h-11 rounded-2xl border-border/70 bg-background/20 text-foreground" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="cardCvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">CVV</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input {...field} placeholder="123" maxLength={4} className="h-11 rounded-2xl border-border/70 bg-background/20 pl-12 text-foreground" />
                                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <div className='mt-6 flex items-center gap-2 text-sm text-muted-foreground font-medium'>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Payments are secure and encrypted</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-14 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base shadow-[0_10px_35px_rgba(56,189,248,0.25)]"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          Processing...
                        </span>
                      ) : (
                        `Pay $${getTotalCart().toFixed(2)}`
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className='max-w-2xl mx-auto text-center'
            >
              <div className='relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 p-12 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_60%)]' />
                <div className='relative w-20 h-20 bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-8'>
                  <CheckCircle className='w-10 h-10 text-primary' />
                </div>
                <h2 className='relative text-3xl font-semibold mb-4 text-foreground'>Payment Successful!</h2>
                <p className='relative text-sm md:text-base font-medium text-muted-foreground mb-8'>
                  Your order has been placed. You will receive a confirmation email shortly.
                </p>

                {purchasedData.items.length > 0 && (
                  <div className="relative mb-8 rounded-3xl bg-secondary/20 p-6 text-left border border-border/60">
                    <h3 className="text-lg font-semibold mb-4 text-foreground border-b border-border/60 pb-2">Order Summary</h3>
                    <div className="space-y-3 text-sm">
                      {purchasedData.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center font-medium text-muted-foreground">
                          <span className="pr-4">{item.name}</span>
                          <span className="text-foreground">${parseFloat(item.price).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-border/60 pt-4 mt-4 flex justify-between items-center text-base font-semibold text-foreground">
                        <span>Total Paid</span>
                        <span className="text-primary">${purchasedData.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => router.push('/')}
                  className="relative h-12 px-10 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]"
                >
                  Return Home
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default CartPage;
