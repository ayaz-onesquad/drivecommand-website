'use client'

import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { useState, FormEvent, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Loader2, Mail, User, Building2, Truck, Briefcase } from 'lucide-react'
import { WelcomeAnimation } from './welcome-animation'
import type { WaitlistFormData, WaitlistState } from '@/hooks/use-waitlist'

interface WaitlistModalProps {
  state: WaitlistState
  onSubmit: (formData: WaitlistFormData) => Promise<void>
  onClose: () => void
}

const FLEET_SIZES = [
  { value: '1-5', label: '1-5 trucks' },
  { value: '6-20', label: '6-20 trucks' },
  { value: '21-50', label: '21-50 trucks' },
  { value: '51-100', label: '51-100 trucks' },
  { value: '100+', label: '100+ trucks' },
]

const ROLES = [
  { value: 'owner', label: 'Owner/Operator' },
  { value: 'dispatcher', label: 'Dispatcher' },
  { value: 'fleet-manager', label: 'Fleet Manager' },
  { value: 'driver', label: 'Driver' },
  { value: 'other', label: 'Other' },
]

export function WaitlistModal({ state, onSubmit, onClose }: WaitlistModalProps) {
  const prefersReducedMotion = useReducedMotion()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    fleetSize: '',
    role: '',
  })

  // Sync email from state when modal opens
  const [emailInitialized, setEmailInitialized] = useState(false)
  if (state.isModalOpen && !emailInitialized && state.email) {
    setFormData(prev => ({ ...prev, email: state.email }))
    setEmailInitialized(true)
  }
  if (!state.isModalOpen && emailInitialized) {
    setEmailInitialized(false)
  }
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate
    const newErrors: Record<string, string> = {}
    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    if (!formData.fleetSize) newErrors.fleetSize = 'Please select fleet size'
    if (!formData.role) newErrors.role = 'Please select your role'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    await onSubmit({
      email: formData.email,
      name: formData.name,
      company: formData.company,
      fleetSize: formData.fleetSize,
      role: formData.role,
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleAnimationComplete = useCallback(() => {
    // Longer delay before closing to let user fully appreciate the success state
    setTimeout(onClose, 2000)
  }, [onClose])

  const isSubmitting = state.step === 'submitting'
  const isSuccess = state.step === 'success'

  return (
    <Dialog.Root open={state.isModalOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {state.isModalOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto rounded-lg shadow-xl"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                }}
                initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Close button */}
                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-white/10 z-10"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>

                {isSuccess && state.position ? (
                  <WelcomeAnimation
                    position={state.position}
                    onComplete={handleAnimationComplete}
                  />
                ) : (
                  <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="mb-6 pr-8">
                      <Dialog.Title
                        className="font-display text-xl md:text-2xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Join the Waitlist
                      </Dialog.Title>
                      <p
                        className="font-body text-sm md:text-base"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Tell us a bit about yourself and we&apos;ll save your spot.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Email (editable) */}
                      <div>
                        <label
                          htmlFor="waitlist-email"
                          className="block text-sm font-medium mb-1.5"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Email
                        </label>
                        <div className="relative">
                          <Mail
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'var(--text-tertiary)' }}
                          />
                          <input
                            id="waitlist-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="you@company.com"
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg font-body text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent-brand)]"
                            style={{
                              backgroundColor: 'var(--surface-base)',
                              color: 'var(--text-primary)',
                              border: errors.email
                                ? '2px solid var(--state-critical)'
                                : '2px solid var(--border-subtle)',
                            }}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs mt-1" style={{ color: 'var(--state-critical)' }}>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Name */}
                      <div>
                        <label
                          htmlFor="waitlist-name"
                          className="block text-sm font-medium mb-1.5"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <User
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'var(--text-tertiary)' }}
                          />
                          <input
                            id="waitlist-name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="John Smith"
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg font-body text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent-brand)]"
                            style={{
                              backgroundColor: 'var(--surface-base)',
                              color: 'var(--text-primary)',
                              border: errors.name
                                ? '2px solid var(--state-critical)'
                                : '2px solid var(--border-subtle)',
                            }}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-xs mt-1" style={{ color: 'var(--state-critical)' }}>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Company */}
                      <div>
                        <label
                          htmlFor="waitlist-company"
                          className="block text-sm font-medium mb-1.5"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Company Name
                        </label>
                        <div className="relative">
                          <Building2
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'var(--text-tertiary)' }}
                          />
                          <input
                            id="waitlist-company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            placeholder="Acme Trucking LLC"
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg font-body text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent-brand)]"
                            style={{
                              backgroundColor: 'var(--surface-base)',
                              color: 'var(--text-primary)',
                              border: errors.company
                                ? '2px solid var(--state-critical)'
                                : '2px solid var(--border-subtle)',
                            }}
                          />
                        </div>
                        {errors.company && (
                          <p className="text-xs mt-1" style={{ color: 'var(--state-critical)' }}>
                            {errors.company}
                          </p>
                        )}
                      </div>

                      {/* Fleet Size */}
                      <div>
                        <label
                          htmlFor="waitlist-fleet"
                          className="block text-sm font-medium mb-1.5"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Fleet Size
                        </label>
                        <div className="relative">
                          <Truck
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'var(--text-tertiary)' }}
                          />
                          <select
                            id="waitlist-fleet"
                            value={formData.fleetSize}
                            onChange={(e) => handleChange('fleetSize', e.target.value)}
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg font-body text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent-brand)] appearance-none cursor-pointer"
                            style={{
                              backgroundColor: 'var(--surface-base)',
                              color: formData.fleetSize ? 'var(--text-primary)' : 'var(--text-tertiary)',
                              border: errors.fleetSize
                                ? '2px solid var(--state-critical)'
                                : '2px solid var(--border-subtle)',
                            }}
                          >
                            <option value="">Select fleet size</option>
                            {FLEET_SIZES.map((size) => (
                              <option key={size.value} value={size.value}>
                                {size.label}
                              </option>
                            ))}
                          </select>
                          {/* Custom dropdown arrow */}
                          <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        {errors.fleetSize && (
                          <p className="text-xs mt-1" style={{ color: 'var(--state-critical)' }}>
                            {errors.fleetSize}
                          </p>
                        )}
                      </div>

                      {/* Role */}
                      <div>
                        <label
                          htmlFor="waitlist-role"
                          className="block text-sm font-medium mb-1.5"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Your Role
                        </label>
                        <div className="relative">
                          <Briefcase
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'var(--text-tertiary)' }}
                          />
                          <select
                            id="waitlist-role"
                            value={formData.role}
                            onChange={(e) => handleChange('role', e.target.value)}
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg font-body text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent-brand)] appearance-none cursor-pointer"
                            style={{
                              backgroundColor: 'var(--surface-base)',
                              color: formData.role ? 'var(--text-primary)' : 'var(--text-tertiary)',
                              border: errors.role
                                ? '2px solid var(--state-critical)'
                                : '2px solid var(--border-subtle)',
                            }}
                          >
                            <option value="">Select your role</option>
                            {ROLES.map((role) => (
                              <option key={role.value} value={role.value}>
                                {role.label}
                              </option>
                            ))}
                          </select>
                          {/* Custom dropdown arrow */}
                          <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        {errors.role && (
                          <p className="text-xs mt-1" style={{ color: 'var(--state-critical)' }}>
                            {errors.role}
                          </p>
                        )}
                      </div>

                      {/* Error message */}
                      {state.error && (
                        <motion.p
                          className="text-sm font-body p-3 rounded-lg"
                          style={{
                            color: 'var(--state-critical)',
                            backgroundColor: 'var(--state-critical-tint)',
                          }}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {state.error}
                        </motion.p>
                      )}

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 rounded-lg font-body font-semibold transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: 'var(--accent-brand)',
                          color: 'var(--text-on-brand)',
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Securing your spot...
                          </>
                        ) : (
                          'Join the Waitlist'
                        )}
                      </button>

                      <p
                        className="text-xs text-center"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        We&apos;ll never share your information. Unsubscribe anytime.
                      </p>
                    </form>
                  </div>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
