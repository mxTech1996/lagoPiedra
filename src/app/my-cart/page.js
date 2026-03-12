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
    <main className='min-h-screen w-full pt-32 pb-20 bg-slate-50 relative overflow-hidden'>
      <div className='container mx-auto px-4 relative z-10'>
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
            className='mb-6 hover:bg-transparent p-0 flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-semibold tracking-wide'
          >
            <ArrowLeft className="w-5 h-5" />
            {step === 'checkout' ? 'Back to Cart' : 'Continue Browsing'}
          </Button>

          <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
            <span className='text-sm font-semibold uppercase tracking-widest text-primary'>
              {step === 'cart' ? 'Your Selection' : step === 'checkout' ? 'Secure Checkout' : 'Order Complete'}
            </span>
          </div>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-slate-900'>
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
                  <div className='bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100'>
                    <p className='text-xl font-bold mb-6 text-slate-900'>Your cart is empty</p>
                    <Button 
                      onClick={() => router.push('/products')}
                      className="h-12 px-8 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-semibold tracking-wide shadow-sm"
                    >
                      Browse Experiences
                    </Button>
                  </div>
                ) : (
                  products?.map((item, index) => (
                    <div key={index} className='bg-white rounded-xl p-6 flex gap-6 items-center shadow-sm border border-slate-100 group hover:shadow-md transition-all duration-300'>
                      <div className='w-24 h-24 bg-slate-50 rounded-lg relative flex-shrink-0 overflow-hidden'>
                        {item.image && (
                          <Image src={item.image} alt={item.name} fill className='object-cover' />
                        )}
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-lg font-bold mb-1 text-slate-900'>{item.name}</h3>
                        <p className='text-base font-semibold text-primary'>${item.price}</p>
                      </div>
                      <Button
                        onClick={() => handleAddOrRemoveProduct(item.id)}
                        size="icon"
                        variant="ghost"
                        className='text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full'
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
                  <div className='bg-white rounded-2xl p-8 shadow-sm border border-slate-100 sticky top-32'>
                    <h3 className='text-xl font-bold mb-6 border-b border-slate-100 pb-4 text-slate-900'>Order Summary</h3>
                    <div className='flex justify-between items-center mb-4'>
                      <span className='font-medium text-slate-600'>Subtotal</span>
                      <span className='font-semibold text-slate-900'>${getTotalCart().toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between items-center mb-8 text-xl'>
                      <span className='font-bold text-slate-900'>Total</span>
                      <span className='font-bold text-primary'>${getTotalCart().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-6">
                      <Checkbox 
                        id="terms" 
                        checked={acceptedTerms}
                        onCheckedChange={setAcceptedTerms}
                        className="rounded border-slate-300 data-[state=checked]:bg-slate-900 data-[state=checked]:text-white"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
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
                      className="w-full h-12 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-semibold tracking-wide shadow-sm"
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
              <div className='bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100'>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    {/* Personal Info */}
                    <div>
                      <h3 className='text-lg font-bold mb-6 flex items-center gap-3 text-slate-900'>
                        <span className='bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold'>1</span>
                        Personal Details
                      </h3>
                      <div className='grid md:grid-cols-2 gap-6'>
                        <FormField
                          control={form.control}
                          name="firstname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">First Name</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50 text-slate-900" />
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
                              <FormLabel className="font-semibold text-slate-700">Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50 text-slate-900" />
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
                              <FormLabel className="font-semibold text-slate-700">Email</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50 text-slate-900" />
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
                              <FormLabel className="font-semibold text-slate-700">Phone</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50 text-slate-900" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator className="bg-slate-100" />

                    {/* Address */}
                    <div>
                      <h3 className='text-lg font-bold mb-6 flex items-center gap-3 text-slate-900'>
                        <span className='bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold'>2</span>
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
                                  <FormLabel className="font-semibold text-slate-700">Street Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50 text-slate-900" />
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
                                <FormLabel className="font-semibold text-slate-700">Ext. No.</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50 text-slate-900" />
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
                                <FormLabel className="font-semibold text-slate-700">Zip Code</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50 text-slate-900" />
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
                                <FormLabel className="font-semibold text-slate-700">City</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50 text-slate-900" />
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
                                <FormLabel className="font-semibold text-slate-700">State</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50 text-slate-900" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-slate-100" />

                    {/* Payment */}
                    <div>
                      <h3 className='text-lg font-bold mb-6 flex items-center gap-3 text-slate-900'>
                        <span className='bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold'>3</span>
                        Payment
                      </h3>
                      <div className='bg-slate-50 p-6 rounded-xl border border-slate-200'>
                        <div className='grid gap-6'>
                           <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold text-slate-700">Card Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    {...field} 
                                    placeholder="0000 0000 0000 0000" 
                                    className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-white pl-12 text-slate-900" 
                                    maxLength={19}
                                    onChange={(e) => {
                                      let value = e.target.value.replace(/\D/g, '');
                                      if (value.length > 16) value = value.slice(0, 16);
                                      const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                                      field.onChange(formatted);
                                    }}
                                  />
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                                    <CreditCard className="w-5 h-5 text-slate-400" />
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
                                <FormLabel className="font-semibold text-slate-700">Name on Card</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="JOHN DOE" className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-white text-slate-900" />
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
                                  <FormLabel className="font-semibold text-slate-700">Expiry (MMYY)</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="1225" maxLength={4} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-white text-slate-900" />
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
                                  <FormLabel className="font-semibold text-slate-700">CVV</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input {...field} placeholder="123" maxLength={4} className="h-11 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-white pl-12 text-slate-900" />
                                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <div className='mt-6 flex items-center gap-2 text-sm text-slate-500 font-medium'>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Payments are secure and encrypted</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-14 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-bold text-lg shadow-sm"
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
              <div className='bg-white rounded-2xl p-12 shadow-sm border border-slate-100'>
                <div className='w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8'>
                  <CheckCircle className='w-10 h-10 text-green-600' />
                </div>
                <h2 className='text-3xl font-bold mb-4 text-slate-900'>Payment Successful!</h2>
                <p className='text-lg font-medium text-slate-600 mb-8'>
                  Your order has been placed. You will receive a confirmation email shortly.
                </p>

                {purchasedData.items.length > 0 && (
                  <div className="mb-8 rounded-xl bg-slate-50 p-6 text-left border border-slate-200">
                    <h3 className="text-lg font-bold mb-4 text-slate-900 border-b border-slate-200 pb-2">Order Summary</h3>
                    <div className="space-y-3">
                      {purchasedData.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm font-medium text-slate-700">
                          <span>{item.name}</span>
                          <span>${parseFloat(item.price).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-slate-200 pt-4 mt-4 flex justify-between items-center text-base font-bold text-slate-900">
                        <span>Total Paid</span>
                        <span className="text-primary">${purchasedData.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => router.push('/')}
                  className="h-12 px-10 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-semibold tracking-wide shadow-sm"
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
