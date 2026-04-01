'use client'

import { useActionState, useEffect } from 'react'
import { submitContactForm, type ContactFormState } from './actions'
import { Toast, useToast } from '@/components/shared/toast'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const FLEET_SIZES = [
  { value: '', label: 'Select fleet size' },
  { value: '1-5', label: '1-5 trucks' },
  { value: '6-15', label: '6-15 trucks' },
  { value: '16-25', label: '16-25 trucks' },
  { value: '26-50', label: '26-50 trucks' },
  { value: '51-100', label: '51-100 trucks' },
  { value: '100+', label: '100+ trucks' },
]

const initialState: ContactFormState = {
  success: false,
  message: '',
  errors: {},
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    if (state.message) {
      showToast(state.message, state.success ? 'success' : 'error')
    }
  }, [state, showToast])

  return (
    <>
      <form action={formAction} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-body text-sm text-theme-secondary mb-2">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={cn(
              'w-full px-4 py-3 rounded-lg border font-body text-theme-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors bg-theme-secondary',
              state.errors?.name ? 'border-red-500' : 'border-theme-medium'
            )}
            placeholder="John Smith"
          />
          {state.errors?.name && (
            <p className="mt-1 font-body text-sm text-red-400">{state.errors.name[0]}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-body text-sm text-theme-secondary mb-2">
            Work Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={cn(
              'w-full px-4 py-3 rounded-lg border font-body text-theme-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors bg-theme-secondary',
              state.errors?.email ? 'border-red-500' : 'border-theme-medium'
            )}
            placeholder="john@company.com"
          />
          {state.errors?.email && (
            <p className="mt-1 font-body text-sm text-red-400">{state.errors.email[0]}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block font-body text-sm text-theme-secondary mb-2">
            Company Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            className={cn(
              'w-full px-4 py-3 rounded-lg border font-body text-theme-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors bg-theme-secondary',
              state.errors?.company ? 'border-red-500' : 'border-theme-medium'
            )}
            placeholder="ABC Trucking"
          />
          {state.errors?.company && (
            <p className="mt-1 font-body text-sm text-red-400">{state.errors.company[0]}</p>
          )}
        </div>

        {/* Fleet Size */}
        <div>
          <label htmlFor="fleetSize" className="block font-body text-sm text-theme-secondary mb-2">
            Fleet Size <span className="text-red-400">*</span>
          </label>
          <select
            id="fleetSize"
            name="fleetSize"
            required
            className={cn(
              'w-full px-4 py-3 rounded-lg border font-body text-theme-primary focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors bg-theme-secondary',
              state.errors?.fleetSize ? 'border-red-500' : 'border-theme-medium'
            )}
          >
            {FLEET_SIZES.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
          {state.errors?.fleetSize && (
            <p className="mt-1 font-body text-sm text-red-400">{state.errors.fleetSize[0]}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block font-body text-sm text-theme-secondary mb-2">
            How Can We Help? <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className={cn(
              'w-full px-4 py-3 rounded-lg border font-body text-theme-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors resize-none bg-theme-secondary',
              state.errors?.message ? 'border-red-500' : 'border-theme-medium'
            )}
            placeholder="Tell us about your fleet and what you're looking for..."
          />
          {state.errors?.message && (
            <p className="mt-1 font-body text-sm text-red-400">{state.errors.message[0]}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'w-full py-4 rounded-lg font-body font-medium text-white transition-colors flex items-center justify-center gap-2',
            isPending
              ? 'bg-[var(--accent-blue)]/50 cursor-not-allowed'
              : 'bg-accent-blue hover:bg-accent-blue-hover'
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>

        <p className="font-body text-xs text-theme-muted text-center">
          By submitting this form, you agree to our{' '}
          <a href="#" className="text-accent-blue hover:underline">Privacy Policy</a>.
        </p>
      </form>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  )
}
