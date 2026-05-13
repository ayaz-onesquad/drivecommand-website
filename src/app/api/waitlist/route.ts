import { NextResponse } from 'next/server'
import { z } from 'zod'

const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(1, 'Company name is required'),
  fleetSize: z.string().min(1, 'Please select your fleet size'),
  role: z.string().min(1, 'Please select your role'),
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

    // In production, this would:
    // 1. Store in database (Neon Postgres)
    // 2. Send welcome email (Resend)
    // 3. Add to CRM
    // For now, simulate a successful submission

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Generate a random position (in production, this would be the actual count)
    const position = Math.floor(Math.random() * 500) + 100

    // Log the submission (in production, persist to database)
    console.log('Waitlist submission:', validated.data)

    return NextResponse.json({
      success: true,
      position,
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
