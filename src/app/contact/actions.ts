'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
})

export async function submitContactForm(values: z.infer<typeof contactSchema>) {
  try {
    const parsedValues = contactSchema.parse(values)

    // In a real application, you would send this data to your backend,
    // an email service, or a CRM.
    console.log('Contact form submitted:', parsedValues)

    // Simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, message: 'Form submitted successfully.' }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Invalid form data.' }
    }
    return {
      success: false,
      message: 'An unexpected error occurred.',
    }
  }
}
