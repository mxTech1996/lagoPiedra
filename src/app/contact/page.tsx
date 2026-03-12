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
    <div className="w-full min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Contact Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10 lg:sticky lg:top-28 lg:col-span-5"
          >
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-4 py-2 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">Contact</span>
              </div>
              <h1 className="mt-8 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
                Request Information
              </h1>
              <p className="mt-5 text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed">
                Planning a scenic flight experience, an aerial show, or production support in a tourism destination? Send details and we&apos;ll reply with a clear proposal.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={`mailto:${dataSite.email}`}
                className="group rounded-3xl border border-border/60 bg-background/25 p-6 backdrop-blur-xl transition-all hover:bg-background/35"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl border border-border/60 bg-secondary/25 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">Email</p>
                    <p className="mt-2 text-sm font-semibold text-foreground break-all group-hover:text-primary transition-colors">
                      {dataSite.email}
                    </p>
                  </div>
                </div>
              </a>

              <div className="rounded-3xl border border-border/60 bg-background/25 p-6 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl border border-border/60 bg-secondary/25 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">Phone</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{dataSite.telephone}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-background/25 p-6 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl border border-border/60 bg-secondary/25 flex items-center justify-center text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">Location</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{dataSite.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-border/60 bg-background/25 p-8 md:p-12 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_60%)]" />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="h-12 rounded-2xl border-border/70 bg-background/20 text-foreground placeholder:text-muted-foreground/70"
                        />
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
                        <Input
                          placeholder="john@example.com"
                          {...field}
                          className="h-12 rounded-2xl border-border/70 bg-background/20 text-foreground placeholder:text-muted-foreground/70"
                        />
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
                      <FormLabel className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us the destination, preferred dates, group size, and what you want to create..."
                          className="min-h-[160px] rounded-2xl border-border/70 bg-background/20 text-foreground placeholder:text-muted-foreground/70 resize-none"
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
                  className="w-full h-14 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold shadow-[0_10px_35px_rgba(56,189,248,0.25)]"
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
