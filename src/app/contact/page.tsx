'use client'

import { motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Loader2, ArrowRight, Mail, MapPin, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { submitContactForm } from './actions'
import { dataSite } from '@/lib/data'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
})

export default function ContactPage() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitContactForm(values)

    if (result.success) {
      toast({
        title: 'Message Sent!',
        description: "Thank you for your inquiry. We'll be in touch soon.",
      })
      form.reset()
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          result.message ||
          'There was a problem with your request. Please try again.',
      })
    }
  }

  return (
    <div className="w-full min-h-screen pt-32 pb-16 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Contact Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12 lg:sticky lg:top-32"
          >
            <div>
               <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-6">
                 <span className='text-sm font-semibold uppercase tracking-widest text-primary'>Contact Us</span>
               </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                Request Information
              </h1>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                Planning a scenic flight experience, an aerial show, or production support in a tourism destination? Send details and we&apos;ll reply with a clear proposal.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-white text-slate-600 rounded-lg shadow-sm border border-slate-200 group-hover:text-primary transition-colors">
                   <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Email Us</h3>
                  <p className="text-slate-600 text-base">{dataSite.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-white text-slate-600 rounded-lg shadow-sm border border-slate-200 group-hover:text-primary transition-colors">
                   <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Call Us</h3>
                  <p className="text-slate-600 text-base">{dataSite.telephone}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-white text-slate-600 rounded-lg shadow-sm border border-slate-200 group-hover:text-primary transition-colors">
                   <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Visit Us</h3>
                  <p className="text-slate-600 text-base">{dataSite.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="h-12 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-slate-900 bg-slate-50/50" />
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
                      <FormLabel className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="h-12 border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-slate-900 bg-slate-50/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us the destination, preferred dates, group size, and what you want to create..."
                          className="min-h-[150px] border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-slate-900 resize-none bg-slate-50/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full h-14 text-lg font-semibold tracking-wide bg-slate-900 text-white hover:bg-slate-800 transition-all rounded-lg shadow-sm hover:shadow-md"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
