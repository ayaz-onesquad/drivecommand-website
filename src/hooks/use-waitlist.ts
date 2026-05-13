'use client'

import { useState, useCallback } from 'react'

export interface WaitlistFormData {
  email: string
  name: string
  company: string
  fleetSize: string
  role: string
}

export interface WaitlistState {
  step: 'idle' | 'modal' | 'submitting' | 'success'
  email: string
  isModalOpen: boolean
  position: number | null
  error: string | null
}

export interface UseWaitlistReturn {
  state: WaitlistState
  openModal: (email: string) => void
  closeModal: () => void
  submit: (formData: WaitlistFormData) => Promise<void>
  reset: () => void
}

const initialState: WaitlistState = {
  step: 'idle',
  email: '',
  isModalOpen: false,
  position: null,
  error: null,
}

export function useWaitlist(): UseWaitlistReturn {
  const [state, setState] = useState<WaitlistState>(initialState)

  const openModal = useCallback((email: string) => {
    setState({
      step: 'modal',
      email,
      isModalOpen: true,
      position: null,
      error: null,
    })
  }, [])

  const closeModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isModalOpen: false,
      step: prev.step === 'success' ? 'success' : 'idle',
    }))
  }, [])

  const submit = useCallback(async (formData: WaitlistFormData) => {
    setState((prev) => ({ ...prev, step: 'submitting', error: null }))

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setState((prev) => ({
        ...prev,
        step: 'success',
        position: data.position,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        step: 'modal',
        error: error instanceof Error ? error.message : 'Something went wrong',
      }))
    }
  }, [])

  const reset = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    state,
    openModal,
    closeModal,
    submit,
    reset,
  }
}
