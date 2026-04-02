'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import {
  Package,
  MessageSquare,
  FileText,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Check,
  Send,
  Upload,
  Loader2,
  LayoutGrid,
  ArrowRight,
} from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { cn } from '@/lib/utils'
import { useParallax, useContentParallax } from '@/hooks/use-parallax'

// Variant A: Primary filled button with lift + glow + arrow animation
const primaryButtonVariants = {
  rest: { y: 0, boxShadow: '0 4px 15px rgba(117, 240, 212, 0.25)' },
  hover: { y: -2, boxShadow: '0 8px 25px rgba(117, 240, 212, 0.35)' },
  tap: { y: 0, boxShadow: '0 2px 8px rgba(117, 240, 212, 0.25)' },
}

const arrowVariants = {
  rest: { opacity: 0, x: -4 },
  hover: { opacity: 1, x: 0 },
}

// Variant C: Small action buttons (scale only, no translation)
const smallButtonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
}

// TIER 2: Subtle grid pattern that moves with parallax
function ParallaxGridPattern({ y }: { y: ReturnType<typeof useParallax>['y'] }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none will-change-transform"
      style={{ y }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--text-secondary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--text-secondary) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </motion.div>
  )
}

const DEMO_STEPS = [
  {
    id: 1,
    title: 'Book a Load',
    description: 'Enter load details in seconds. Rate, route, pickup time, and broker contact — all in one form.',
    icon: Package,
  },
  {
    id: 2,
    title: 'Active Loads',
    description: "Every load your fleet is running — live status, driver, route, and ETA at a glance.",
    icon: LayoutGrid,
  },
  {
    id: 3,
    title: 'Driver Comms',
    description: 'No more personal cell numbers. Message any driver directly from dispatch — with a full message history.',
    icon: MessageSquare,
  },
  {
    id: 4,
    title: 'Driver Docs',
    description: 'Drivers upload BOL and POD photos from their phone. You get them instantly — no email, no scanning, no chasing.',
    icon: FileText,
  },
  {
    id: 5,
    title: 'Financials',
    description: 'Revenue, outstanding invoices, and driver pay — all current, all in one view. Know your numbers before your accountant does.',
    icon: DollarSign,
  },
]

// ============================================================================
// STEP 1: Book a Load
// ============================================================================
function Step1BookLoad() {
  const [isBooked, setIsBooked] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleBook = () => {
    setIsBooked(true)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="rounded-xl border p-6 bg-theme-secondary border-theme-medium relative overflow-hidden">
      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 right-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 text-emerald-400 text-sm font-body flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Load LD-2024-0891 created successfully
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold text-theme-primary">New Load</h3>
        <AnimatePresence mode="wait">
          {isBooked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <StatusBadge status="dispatched" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        {/* Load # */}
        <div>
          <label className="block font-body text-xs text-theme-secondary mb-1">Load #</label>
          <div className="rounded-lg px-3 py-2 font-body text-sm text-theme-muted bg-theme-card">
            LD-2024-0891 (auto-generated)
          </div>
        </div>

        {/* Customer/Broker */}
        <div>
          <label className="block font-body text-xs text-theme-secondary mb-1">Customer / Broker</label>
          <div className="rounded-lg px-3 py-2 font-body text-sm text-theme-primary bg-theme-card">
            Apex Freight Brokers
          </div>
        </div>

        {/* Origin / Destination */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-xs text-theme-secondary mb-1">Origin</label>
            <div className="rounded-lg px-3 py-2 font-body text-sm text-theme-primary bg-theme-card">
              Chicago, IL
            </div>
          </div>
          <div>
            <label className="block font-body text-xs text-theme-secondary mb-1">Destination</label>
            <div className="rounded-lg px-3 py-2 font-body text-sm text-theme-primary bg-theme-card">
              Atlanta, GA
            </div>
          </div>
        </div>

        {/* Pickup Date */}
        <div>
          <label className="block font-body text-xs text-theme-secondary mb-1">Pickup Date</label>
          <div className="rounded-lg px-3 py-2 font-body text-sm text-theme-primary bg-theme-card">
            Apr 3, 2026 · 06:00 AM
          </div>
        </div>

        {/* Rate / Miles */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-xs text-theme-secondary mb-1">Rate</label>
            <div className="rounded-lg px-3 py-2 font-body text-sm text-accent-green bg-theme-card">
              $2,400.00
            </div>
          </div>
          <div>
            <label className="block font-body text-xs text-theme-secondary mb-1">Miles</label>
            <div className="rounded-lg px-3 py-2 font-body text-sm text-theme-primary bg-theme-card">
              716 mi
            </div>
          </div>
        </div>

        {/* Book Button - Variant C */}
        <motion.button
          className={cn(
            'w-full py-3 font-body font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors',
            isBooked
              ? 'bg-emerald-500 text-white cursor-not-allowed opacity-60 pointer-events-none'
              : 'bg-dc-accent text-dc-text-on-accent hover:border-sky-400/60'
          )}
          onClick={handleBook}
          disabled={isBooked}
          initial="rest"
          whileHover={!isBooked ? "hover" : undefined}
          whileTap={!isBooked ? "tap" : undefined}
          animate="rest"
          variants={!isBooked ? smallButtonVariants : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {isBooked ? (
            <>
              <Check className="w-5 h-5" />
              Booked
            </>
          ) : (
            'Book This Load'
          )}
        </motion.button>
      </div>
    </div>
  )
}

// ============================================================================
// STEP 2: Active Loads Board
// ============================================================================
function Step2ActiveLoads() {
  const [row1Updated, setRow1Updated] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleUpdateStatus = () => {
    setRow1Updated(true)
    setShowAlert(true)
  }

  const loads = [
    { id: 'LD-2024-0891', route: 'CHI → ATL', driver: 'Mike Torres', status: row1Updated ? 'in-transit' : 'dispatched', rate: '$2,400', eta: row1Updated ? 'Today 8:30PM' : 'Today 6:00PM', etaDelay: row1Updated },
    { id: 'LD-2024-0887', route: 'DAL → LAX', driver: 'Sarah Chen', status: 'in-transit', rate: '$3,150', eta: 'Tomorrow 9:00AM', etaDelay: false },
    { id: 'LD-2024-0883', route: 'NYC → MIA', driver: 'James Hill', status: 'in-transit', rate: '$1,890', eta: 'Apr 4, 2:00PM', etaDelay: false },
    { id: 'LD-2024-0879', route: 'DEN → SEA', driver: 'Rosa Alvarez', status: 'delivered', rate: '$2,700', eta: 'Completed', etaDelay: false },
  ]

  return (
    <div className="rounded-xl border p-4 sm:p-6 bg-theme-secondary border-theme-medium">
      <h3 className="font-display text-lg font-semibold text-theme-primary mb-4">Active Loads</h3>

      <div className="space-y-2">
        {/* Header - hidden on mobile */}
        <div className="hidden sm:grid grid-cols-12 gap-2 px-3 py-2 text-xs font-body text-theme-muted uppercase tracking-wide">
          <div className="col-span-2">Load #</div>
          <div className="col-span-2">Route</div>
          <div className="col-span-2">Driver</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Rate</div>
          <div className="col-span-2">ETA</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        {loads.map((load, index) => (
          <div key={load.id}>
            <div className={cn(
              'grid grid-cols-3 sm:grid-cols-12 gap-2 px-3 py-3 rounded-lg bg-theme-card items-center',
              index === 0 && row1Updated && 'ring-1 ring-amber-500/30'
            )}>
              {/* Mobile: Load #, Status, Rate */}
              {/* Desktop: Full row */}
              <div className="col-span-1 sm:col-span-2 font-body text-sm text-theme-primary font-medium">
                {load.id.replace('LD-2024-', '')}
                <span className="hidden sm:inline"> ({load.id})</span>
              </div>
              <div className="hidden sm:block sm:col-span-2 font-body text-sm text-theme-secondary">{load.route}</div>
              <div className="hidden sm:block sm:col-span-2 font-body text-sm text-theme-secondary">{load.driver}</div>
              <div className="col-span-1 sm:col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={load.status}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <StatusBadge status={load.status as 'dispatched' | 'in-transit' | 'delivered'} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="col-span-1 sm:col-span-1 font-body text-sm text-accent-green">{load.rate}</div>
              <div className={cn(
                'hidden sm:block sm:col-span-2 font-body text-sm',
                load.etaDelay ? 'text-amber-400' : 'text-theme-secondary'
              )}>
                {load.eta}
                {load.etaDelay && <span className="text-xs ml-1">+2hr delay</span>}
              </div>
              <div className="hidden sm:block sm:col-span-1">
                {index === 0 && !row1Updated && (
                  <motion.button
                    onClick={handleUpdateStatus}
                    className="text-xs px-2 py-1 rounded border border-theme-subtle text-theme-secondary hover:text-theme-primary hover:border-sky-400/60 transition-colors"
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    animate="rest"
                    variants={smallButtonVariants}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    Update
                  </motion.button>
                )}
              </div>
            </div>

            {/* Alert row for row 1 */}
            <AnimatePresence>
              {index === 0 && showAlert && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-3 mt-1 px-3 py-2 bg-amber-500/10 border-l-2 border-amber-500 rounded-r text-sm font-body text-amber-300"
                >
                  Mike Torres checked in at Indianapolis, IN — 340 mi remaining
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Mobile update button - Variant C */}
      {!row1Updated && (
        <motion.button
          onClick={handleUpdateStatus}
          className="sm:hidden w-full mt-4 py-2 text-sm font-body rounded-lg border border-theme-subtle text-theme-secondary hover:text-theme-primary hover:border-sky-400/60 transition-colors"
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          animate="rest"
          variants={smallButtonVariants}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          Update Load 0891 Status
        </motion.button>
      )}
    </div>
  )
}

// ============================================================================
// STEP 3: Driver Communications
// ============================================================================
function Step3DriverComms() {
  const [messages, setMessages] = useState([
    { from: 'dispatch', time: '10:32 AM', text: "Mike, you're loaded and clear for Atlanta. Confirm when rolling." },
    { from: 'driver', time: '10:38 AM', text: 'Rolling. Weight is good, no issues at the dock.' },
    { from: 'dispatch', time: '10:39 AM', text: '10-4. Check in at the state line.' },
  ])
  const [messageSent, setMessageSent] = useState(false)
  const [showReply, setShowReply] = useState(false)

  const handleSend = () => {
    if (messageSent) return
    setMessages(prev => [...prev, { from: 'dispatch', time: 'now', text: 'ETA update needed — any delays?' }])
    setMessageSent(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'driver', time: 'now', text: 'All good, on schedule.' }])
      setShowReply(true)
    }, 1500)
  }

  const drivers = [
    { name: 'Mike Torres', initials: 'MT', status: 'driving', active: true },
    { name: 'Sarah Chen', initials: 'SC', status: 'driving', active: false },
    { name: 'James Hill', initials: 'JH', status: 'available', active: false },
  ]

  return (
    <div className="rounded-xl border bg-theme-secondary border-theme-medium overflow-hidden">
      <div className="flex">
        {/* Driver list - hidden on mobile */}
        <div className="hidden sm:block w-36 border-r border-theme-medium bg-theme-card">
          <div className="p-3 border-b border-theme-medium">
            <span className="font-body text-xs text-theme-muted uppercase tracking-wide">Drivers</span>
          </div>
          {drivers.map((driver) => (
            <div
              key={driver.name}
              className={cn(
                'flex items-center gap-2 p-3 cursor-pointer transition-colors',
                driver.active ? 'bg-dc-accent/10 border-l-2 border-dc-accent' : 'hover:bg-theme-card-hover'
              )}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-theme-secondary flex items-center justify-center">
                  <span className="font-body text-xs text-theme-primary">{driver.initials}</span>
                </div>
                <div className={cn(
                  'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-theme-card',
                  driver.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                )} />
              </div>
              <span className="font-body text-xs text-theme-primary truncate">{driver.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        {/* Chat panel */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-3 border-b border-theme-medium flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-theme-card flex items-center justify-center">
              <span className="font-body text-xs text-theme-primary">MT</span>
            </div>
            <div>
              <div className="font-body text-sm font-medium text-theme-primary">Mike Torres</div>
              <div className="font-body text-xs text-amber-400">On route · CHI → ATL</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 max-h-64 overflow-y-auto">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={i >= 3 ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex',
                  msg.from === 'dispatch' ? 'justify-end' : 'justify-start'
                )}
              >
                <div className={cn(
                  'max-w-[80%] rounded-lg px-3 py-2',
                  msg.from === 'dispatch'
                    ? 'bg-dc-accent text-dc-text-on-accent'
                    : 'bg-theme-card text-theme-primary'
                )}>
                  <div className="font-body text-sm">{msg.text}</div>
                  <div className={cn(
                    'font-body text-xs mt-1',
                    msg.from === 'dispatch' ? 'text-white/60' : 'text-theme-muted'
                  )}>
                    {msg.from === 'dispatch' ? 'Dispatch' : 'Mike Torres'} · {msg.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-theme-medium flex gap-2">
            <div className={cn(
              'flex-1 rounded-lg px-3 py-2 font-body text-sm bg-theme-card',
              messageSent ? 'text-theme-muted' : 'text-theme-primary'
            )}>
              {messageSent ? '' : 'ETA update needed — any delays?'}
            </div>
            <motion.button
              onClick={handleSend}
              disabled={messageSent}
              className={cn(
                'px-4 py-2 rounded-lg font-body text-sm font-medium flex items-center gap-2 transition-colors',
                messageSent
                  ? 'bg-theme-card text-theme-muted cursor-not-allowed opacity-60 pointer-events-none'
                  : 'bg-dc-accent text-dc-text-on-accent hover:border-sky-400/60'
              )}
              initial="rest"
              whileHover={!messageSent ? "hover" : undefined}
              whileTap={!messageSent ? "tap" : undefined}
              animate="rest"
              variants={!messageSent ? smallButtonVariants : {}}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Send className="w-4 h-4" />
              Send
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// STEP 4: Driver Documents
// ============================================================================
function Step4DriverDocs() {
  const [podUploaded, setPodUploaded] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const handleSimulateUpload = () => {
    setPodUploaded(true)
    setShowNotification(true)
  }

  const documents = [
    { name: 'Bill of Lading (BOL)', status: 'uploaded', date: 'Apr 3 · 6:18 AM', by: 'Mike Torres' },
    { name: 'Proof of Delivery (POD)', status: podUploaded ? 'uploaded' : 'pending', date: podUploaded ? 'Apr 3 · 4:52 PM' : null, by: podUploaded ? 'Mike Torres (Mobile)' : null },
    { name: 'Rate Confirmation', status: 'uploaded', date: 'Apr 1 · 2:44 PM', by: 'Dispatch' },
    { name: 'Weight Ticket', status: 'pending', date: null, by: null },
  ]

  return (
    <div className="rounded-xl border p-6 bg-theme-secondary border-theme-medium relative overflow-hidden">
      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 right-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 text-emerald-400 text-sm font-body"
          >
            POD received for LD-2024-0891 — invoice can now be generated
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-theme-primary">Documents</h3>
          <p className="font-body text-sm text-theme-secondary">Load LD-2024-0891</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {documents.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center justify-between p-3 rounded-lg bg-theme-card"
          >
            <div className="flex-1">
              <div className="font-body text-sm text-theme-primary">{doc.name}</div>
              {doc.date && (
                <div className="font-body text-xs text-theme-muted mt-0.5">
                  {doc.date} · by {doc.by}
                </div>
              )}
              {!doc.date && (
                <div className="font-body text-xs text-theme-muted mt-0.5">
                  Awaiting driver upload
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={doc.status}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {doc.status === 'uploaded' ? (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-body font-medium bg-emerald-500/10 text-emerald-400">
                      Uploaded
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-body font-medium bg-amber-500/10 text-amber-400">
                      Pending
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
              {doc.status === 'uploaded' && (
                <button className="font-body text-xs text-accent-cyan hover:underline">
                  View
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Simulate Upload Button - Variant C */}
      <motion.button
        onClick={handleSimulateUpload}
        disabled={podUploaded}
        className={cn(
          'w-full py-3 font-body font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors',
          podUploaded
            ? 'bg-emerald-500 text-white cursor-not-allowed opacity-60 pointer-events-none'
            : 'bg-dc-accent text-dc-text-on-accent hover:border-sky-400/60'
        )}
        initial="rest"
        whileHover={!podUploaded ? "hover" : undefined}
        whileTap={!podUploaded ? "tap" : undefined}
        animate="rest"
        variants={!podUploaded ? smallButtonVariants : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {podUploaded ? (
          <>
            <Check className="w-5 h-5" />
            Upload Complete
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Simulate Driver Upload (POD)
          </>
        )}
      </motion.button>
    </div>
  )
}

// ============================================================================
// STEP 5: Financials
// ============================================================================
function Step5Financials() {
  const [reminderSent, setReminderSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendReminder = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setReminderSent(true)
    }, 800)
  }

  const invoices = [
    { id: 'INV-0091', customer: 'Apex Freight', amount: '$2,400', status: 'sent', due: 'Due Apr 10' },
    { id: 'INV-0088', customer: 'CargoLink LLC', amount: '$3,150', status: reminderSent ? 'reminder-sent' : 'overdue', due: 'Due Mar 28' },
    { id: 'INV-0084', customer: 'FastHaul Inc', amount: '$3,350', status: 'paid', due: 'Received Apr 1' },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-body font-medium bg-blue-500/10 text-blue-400">Sent</span>
      case 'overdue':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-body font-medium bg-red-500/10 text-red-400">Overdue</span>
      case 'reminder-sent':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-body font-medium bg-blue-500/10 text-blue-400">Reminder Sent</span>
      case 'paid':
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-body font-medium bg-emerald-500/10 text-emerald-400">Paid</span>
      default:
        return null
    }
  }

  return (
    <div className="rounded-xl border p-6 bg-theme-secondary border-theme-medium">
      <h3 className="font-display text-lg font-semibold text-theme-primary mb-6">Financial Summary</h3>

      {/* Stats Tiles */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 rounded-lg bg-theme-card text-center">
          <div className="font-body text-xs text-theme-muted mb-1">This Month Revenue</div>
          <div className="font-display text-xl font-bold text-emerald-400">$47,200</div>
        </div>
        <div className="p-4 rounded-lg bg-theme-card text-center">
          <div className="font-body text-xs text-theme-muted mb-1">Outstanding</div>
          <div className="font-display text-xl font-bold text-sky-400">$8,900</div>
          <div className="font-body text-xs text-theme-muted">
            3 invoices
            {reminderSent && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="block text-blue-400"
              >
                (reminder sent)
              </motion.span>
            )}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-theme-card text-center">
          <div className="font-body text-xs text-theme-muted mb-1">Driver Pay Due</div>
          <div className="font-display text-xl font-bold text-theme-secondary">$12,400</div>
          <div className="font-body text-xs text-theme-muted">Friday payroll</div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="space-y-2">
        <div className="hidden sm:grid grid-cols-12 gap-2 px-3 py-2 text-xs font-body text-theme-muted uppercase tracking-wide">
          <div className="col-span-2">Invoice</div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Due</div>
          <div className="col-span-1"></div>
        </div>

        {invoices.map((invoice, index) => (
          <div
            key={invoice.id}
            className="grid grid-cols-3 sm:grid-cols-12 gap-2 px-3 py-3 rounded-lg bg-theme-card items-center"
          >
            <div className="col-span-1 sm:col-span-2 font-body text-sm text-theme-primary font-medium">
              {invoice.id}
            </div>
            <div className="hidden sm:block sm:col-span-3 font-body text-sm text-theme-secondary">
              {invoice.customer}
            </div>
            <div className="col-span-1 sm:col-span-2 font-body text-sm text-accent-green">
              {invoice.amount}
            </div>
            <div className="col-span-1 sm:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={invoice.status}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {getStatusBadge(invoice.status)}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="hidden sm:block sm:col-span-2 font-body text-sm text-theme-secondary">
              {invoice.due}
            </div>
            <div className="hidden sm:block sm:col-span-1">
              {index === 1 && !reminderSent && (
                <motion.button
                  onClick={handleSendReminder}
                  disabled={loading}
                  className={cn(
                    "text-xs px-2 py-1 rounded border border-theme-subtle text-theme-secondary hover:text-theme-primary hover:border-sky-400/60 transition-colors flex items-center gap-1",
                    loading && "opacity-60 pointer-events-none"
                  )}
                  initial="rest"
                  whileHover={!loading ? "hover" : undefined}
                  whileTap={!loading ? "tap" : undefined}
                  animate="rest"
                  variants={!loading ? smallButtonVariants : {}}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {loading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    'Remind'
                  )}
                </motion.button>
              )}
              {index === 1 && reminderSent && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs text-emerald-400 flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Sent
                </motion.span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile reminder button - Variant C */}
      {!reminderSent && (
        <motion.button
          onClick={handleSendReminder}
          disabled={loading}
          className={cn(
            "sm:hidden w-full mt-4 py-2 text-sm font-body rounded-lg border border-theme-subtle text-theme-secondary hover:text-theme-primary hover:border-sky-400/60 transition-colors flex items-center justify-center gap-2",
            loading && "opacity-60 pointer-events-none"
          )}
          initial="rest"
          whileHover={!loading ? "hover" : undefined}
          whileTap={!loading ? "tap" : undefined}
          animate="rest"
          variants={!loading ? smallButtonVariants : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>Send Reminder to CargoLink</>
          )}
        </motion.button>
      )}
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const STEP_COMPONENTS = [Step1BookLoad, Step2ActiveLoads, Step3DriverComms, Step4DriverDocs, Step5Financials]

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  // TIER 2: Decorative grid parallax - use section ref directly
  const { y: decorativeY, isDesktop } = useParallax({
    speed: 0.2,
    outputRange: [0, -50],
  })

  // TIER 3: Content micro-parallax
  const { y: contentY } = useContentParallax()

  const goToStep = (step: number) => {
    if (step >= 0 && step < DEMO_STEPS.length) {
      setCurrentStep(step)
    }
  }

  const StepComponent = STEP_COMPONENTS[currentStep]

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative z-[1] py-24 bg-theme-secondary overflow-hidden"
    >
      {/* TIER 2: Parallax grid pattern (desktop only) */}
      {isDesktop && <ParallaxGridPattern y={decorativeY} />}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TIER 3: Content with micro-parallax */}
        <motion.div
          className="text-center mb-16 will-change-transform"
          style={isDesktop ? { y: contentY } : undefined}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-theme-primary mb-4">
              See How Your Day Changes
            </h2>
            <p className="font-body text-lg text-theme-secondary max-w-2xl mx-auto">
              Five workflows you do every day — now faster, cleaner, and all in one place.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Steps sidebar */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {DEMO_STEPS.map((step, index) => (
              <motion.button
                key={step.id}
                className={cn(
                  'w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all',
                  currentStep === index
                    ? 'shadow-lg border-2 border-dc-accent bg-theme-card'
                    : 'border border-theme-subtle hover:shadow bg-theme-card/50 hover:bg-theme-card'
                )}
                onClick={() => goToStep(index)}
                whileHover={{ scale: 1.01 }}
              >
                <div
                  className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                    currentStep === index
                      ? 'bg-dc-accent text-dc-text-on-accent'
                      : currentStep > index
                      ? 'bg-brand-green text-white'
                      : 'text-theme-muted'
                  )}
                  style={currentStep <= index && currentStep !== index ? { backgroundColor: 'var(--bg-secondary)' } : undefined}
                >
                  {currentStep > index ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div
                    className={cn(
                      'font-display font-semibold mb-1',
                      currentStep === index ? 'text-dc-accent' : 'text-theme-primary'
                    )}
                  >
                    {step.id}. {step.title}
                  </div>
                  <div className="font-body text-sm text-theme-secondary">
                    {step.description}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Interactive panel */}
          <motion.div
            className="sticky top-24"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepComponent />
              </motion.div>
            </AnimatePresence>

            {/* Navigation - Variant B for Previous/Next */}
            <div className="flex items-center justify-between mt-6">
              <motion.button
                onClick={() => goToStep(currentStep - 1)}
                disabled={currentStep === 0}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm border border-transparent transition-all duration-200',
                  currentStep === 0
                    ? 'text-theme-muted cursor-not-allowed opacity-60 pointer-events-none'
                    : 'text-theme-secondary hover:text-theme-primary hover:bg-sky-400/10 hover:border-sky-400/40'
                )}
                whileHover={currentStep !== 0 && !prefersReducedMotion ? { y: -1 } : undefined}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </motion.button>

              <div className="flex gap-2">
                {DEMO_STEPS.map((step, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToStep(index)}
                    aria-label={`Go to step ${index + 1}: ${step.title}`}
                    className="w-2 h-2 rounded-full"
                    animate={{
                      scale: currentStep === index && !prefersReducedMotion ? 1.4 : 1,
                      backgroundColor: currentStep === index ? 'var(--color-accent)' : 'var(--text-muted)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => goToStep(currentStep + 1)}
                disabled={currentStep === DEMO_STEPS.length - 1}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm border border-transparent transition-all duration-200',
                  currentStep === DEMO_STEPS.length - 1
                    ? 'text-theme-muted cursor-not-allowed opacity-60 pointer-events-none'
                    : 'text-theme-secondary hover:text-theme-primary hover:bg-sky-400/10 hover:border-sky-400/40'
                )}
                whileHover={currentStep !== DEMO_STEPS.length - 1 && !prefersReducedMotion ? { y: -1 } : undefined}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* CTA - Variant A */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="font-body text-lg text-theme-secondary mb-6">
            Run your operation like this —
          </p>
          <motion.div
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate="rest"
            className="inline-block"
          >
            <Link href="/contact" className="block">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 font-body font-medium rounded-lg bg-dc-accent text-dc-text-on-accent"
                variants={prefersReducedMotion ? {} : primaryButtonVariants}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Get Early Access
                <motion.span
                  className="inline-flex"
                  variants={prefersReducedMotion ? {} : arrowVariants}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
