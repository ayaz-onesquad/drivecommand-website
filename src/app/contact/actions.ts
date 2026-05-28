'use server'

import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company name is required'),
  fleetSize: z.string().min(1, 'Please select your fleet size'),
  role: z.string().min(1, 'Please select your role'),
  message: z.string().min(10, 'Please describe the problems you want to solve'),
})

export type ContactFormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    company?: string[]
    fleetSize?: string[]
    role?: string[]
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
    role: formData.get('role'),
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

    // Insert lead into LineUp Supabase (non-blocking, skipped if not configured)
    const supabase = getSupabaseAdmin()
    const tenantId = process.env.LINEUP_TENANT_ID

    if (supabase && tenantId) {
      try {
        // Split name into first and last
        const nameParts = validated.data.name.trim().split(/\s+/)
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''

        // Map form roles to LineUp contact roles (lowercase)
        const roleMap: Record<string, string> = {
          'owner': 'owner',
          'dispatcher': 'coordinator',
          'fleet-manager': 'manager',
          'driver': 'other',
          'other': 'other',
        }
        const contactRole = roleMap[validated.data.role] || 'other'

        // Create Lead first
        const { data: lead, error: leadError } = await supabase
          .from('leads')
          .insert({
            tenant_id: tenantId,
            lead_name: `${validated.data.company} - Contact Form`,
            email: validated.data.email,
            status: 'new',
            source: 'website',
            source_automation_name: 'DriveCommand Contact Form',
          })
          .select('id')
          .single()

        if (leadError) {
          console.error('Failed to insert lead into Supabase:', leadError)
        } else if (lead) {
          // Create Contact
          const { data: contact, error: contactError } = await supabase
            .from('contacts')
            .insert({
              tenant_id: tenantId,
              first_name: firstName,
              last_name: lastName,
              email: validated.data.email,
              role: contactRole,
              created_by: '383150cb-4b72-450a-99f7-dd829f5d2544',
            })
            .select('id')
            .single()

          if (contactError) {
            console.error('Failed to insert contact into Supabase:', contactError)
          } else if (contact) {
            // Link contact to lead via junction table
            const { error: linkError } = await supabase
              .from('lead_contacts')
              .insert({
                tenant_id: tenantId,
                lead_id: lead.id,
                contact_id: contact.id,
                is_primary: true,
                is_decision_maker: true,
                role_at_lead: 'Contact Form Inquiry',
              })

            if (linkError) {
              console.error('Failed to link contact to lead:', linkError)
            }
          }
        }
      } catch (err) {
        console.error('Supabase lead insert error:', err)
      }
    }

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
