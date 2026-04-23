'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company name is required'),
  fleetSize: z.string().min(1, 'Please select your fleet size'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    company?: string[]
    fleetSize?: string[]
    message?: string[]
  }
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    fleetSize: formData.get('fleetSize'),
    message: formData.get('message'),
  }

  const validated = contactSchema.safeParse(rawData)

  if (!validated.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: validated.error.flatten().fieldErrors,
    }
  }

  // In production, this would send to Resend/email service
  // For now, we'll simulate a successful submission
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log the submission (in production, send email via Resend)
    console.log('Contact form submission:', validated.data)

    return {
      success: true,
      message: "Thanks for reaching out! We'll get back to you within one business day.",
    }
  } catch {
    return {
      success: false,
      message: 'Something went wrong. Please try again or email us directly at sales@drivecommand.co',
    }
  }
}
