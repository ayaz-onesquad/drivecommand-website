'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { submitContactForm, type ContactFormState } from './actions'
import { Toast, useToast } from '@/components/shared/toast'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const FLEET_SIZES = [
  { value: '', label: 'Select fleet size' },
  { value: '1-5', label: '1-5 trucks' },
  { value: '6-20', label: '6-20 trucks' },
  { value: '21-50', label: '21-50 trucks' },
  { value: '51-100', label: '51-100 trucks' },
  { value: '100+', label: '100+ trucks' },
]

const ROLES = [
  { value: '', label: 'Select your role' },
  { value: 'owner', label: 'Owner/Operator' },
  { value: 'dispatcher', label: 'Dispatcher' },
  { value: 'fleet-manager', label: 'Fleet Manager' },
  { value: 'driver', label: 'Driver' },
  { value: 'other', label: 'Other' },
]

const initialState: ContactFormState = {
  success: false,
  message: '',
  errors: {},
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const { toast, showToast, hideToast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    if (state.message) {
      showToast(state.message, state.success ? 'success' : 'error')

      // Reset form after successful submission
      if (state.success) {
        formRef.current?.reset()
        setFormKey(prev => prev + 1)
      }
    }
  }, [state, showToast])

  return (
    <>
      <form key={formKey} ref={formRef} action={formAction} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-body text-sm text-theme-secondary mb-2">
            Full Name <span className="text-[var(--state-critical)]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={cn(
              'w-full px-4 py-3 rounded-input border font-body text-theme-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors bg-theme-secondary',
              state.errors?.name ? 'border-[var(--state-critical)]' : 'border-theme-medium'
            )}
            placeholder="John Smith"
          />
          {state.errors?.name && (
            <p className="mt-1 font-body text-sm text-[var(--state-critical)]">{state.errors.name[0]}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-body text-sm text-theme-secondary mb-2">
            Work Email <span className="text-[var(--state-critical)]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={cn(
              'w-full px-4 py-3 rounded-input border font-body text-theme-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors bg-theme-secondary',
              state.errors?.email ? 'border-[var(--state-critical)]' : 'border-theme-medium'
            )}
            placeholder="john@company.com"
          />
          {state.errors?.email && (
            <p className="mt-1 font-body text-sm text-[var(--state-critical)]">{state.errors.email[0]}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block font-body text-sm text-theme-secondary mb-2">
            Company Name <span className="text-[var(--state-critical)]">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            className={cn(
              'w-full px-4 py-3 rounded-input border font-body text-theme-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors bg-theme-secondary',
              state.errors?.company ? 'border-[var(--state-critical)]' : 'border-theme-medium'
            )}
            placeholder="ABC Trucking"
          />
          {state.errors?.company && (
            <p className="mt-1 font-body text-sm text-[var(--state-critical)]">{state.errors.company[0]}</p>
          )}
        </div>

        {/* Fleet Size */}
        <div>
          <label htmlFor="fleetSize" className="block font-body text-sm text-theme-secondary mb-2">
            Fleet Size <span className="text-[var(--state-critical)]">*</span>
          </label>
          <select
            id="fleetSize"
            name="fleetSize"
            required
            className={cn(
              'w-full px-4 py-3 rounded-input border font-body text-theme-primary focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors bg-theme-secondary',
              state.errors?.fleetSize ? 'border-[var(--state-critical)]' : 'border-theme-medium'
            )}
          >
            {FLEET_SIZES.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
          {state.errors?.fleetSize && (
            <p className="mt-1 font-body text-sm text-[var(--state-critical)]">{state.errors.fleetSize[0]}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block font-body text-sm text-theme-secondary mb-2">
            Your Role <span className="text-[var(--state-critical)]">*</span>
          </label>
          <select
            id="role"
            name="role"
            required
            className={cn(
              'w-full px-4 py-3 rounded-input border font-body text-theme-primary focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors bg-theme-secondary',
              state.errors?.role ? 'border-[var(--state-critical)]' : 'border-theme-medium'
            )}
          >
            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          {state.errors?.role && (
            <p className="mt-1 font-body text-sm text-[var(--state-critical)]">{state.errors.role[0]}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block font-body text-sm text-theme-secondary mb-2">
            What problems are you trying to solve? <span className="text-[var(--state-critical)]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className={cn(
              'w-full px-4 py-3 rounded-input border font-body text-theme-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] transition-colors resize-none bg-theme-secondary',
              state.errors?.message ? 'border-[var(--state-critical)]' : 'border-theme-medium'
            )}
            placeholder="Tell us about your fleet and what you're looking for..."
          />
          {state.errors?.message && (
            <p className="mt-1 font-body text-sm text-[var(--state-critical)]">{state.errors.message[0]}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'w-full py-4 rounded-input font-body font-medium transition-colors flex items-center justify-center gap-2',
            isPending
              ? 'bg-dc-accent/50 text-dc-text-on-accent cursor-not-allowed'
              : 'bg-dc-accent text-dc-text-on-accent hover:opacity-90'
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
