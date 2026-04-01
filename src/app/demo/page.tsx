import type { Metadata } from 'next'
import { DemoPageContent } from './demo-content'

export const metadata: Metadata = {
  title: 'Demo',
  description: 'See DriveCommand in action. Step through a real dispatch day — from load assignment to invoice — in under 5 minutes.',
  openGraph: {
    title: 'DriveCommand Demo',
    description: 'See DriveCommand in action. Step through a real dispatch day in under 5 minutes.',
    type: 'website',
  },
}

export default function DemoPage() {
  return <DemoPageContent />
}
