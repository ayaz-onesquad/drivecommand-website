import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(1, 'Company name is required'),
  fleetSize: z.string().min(1, 'Please select your fleet size'),
  role: z.string().min(1, 'Please select your role'),
  message: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = waitlistSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validated.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    // Log the submission
    console.log('Waitlist submission:', validated.data)

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
            lead_name: `${validated.data.company} - Waitlist`,
            email: validated.data.email,
            status: 'new',
            source: 'website',
            source_automation_name: 'DriveCommand Waitlist',
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
                role_at_lead: 'Waitlist Signup',
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

    return NextResponse.json({
      success: true,
      message: 'Welcome to the waitlist!',
    })
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again.'
      },
      { status: 500 }
    )
  }
}
