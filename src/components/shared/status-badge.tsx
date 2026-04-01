import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium font-body ring-1',
  {
    variants: {
      status: {
        'in-transit':  'bg-amber-500/10  text-amber-400  ring-amber-500/20',
        'delivered':   'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
        'dispatched':  'bg-indigo-500/10  text-indigo-400  ring-indigo-500/20',
        'invoiced':    'bg-blue-500/10   text-blue-400   ring-blue-500/20',
      },
    },
    defaultVariants: {
      status: 'dispatched',
    },
  }
)

const STATUS_DOTS: Record<string, string> = {
  'in-transit': 'bg-amber-400',
  'delivered':  'bg-emerald-400',
  'dispatched': 'bg-indigo-400',
  'invoiced':   'bg-blue-400',
}

const STATUS_LABELS: Record<string, string> = {
  'in-transit': 'In Transit',
  'delivered':  'Delivered',
  'dispatched': 'Dispatched',
  'invoiced':   'Invoiced',
}

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const resolvedStatus = status ?? 'dispatched'
  return (
    <span
      className={cn(statusBadgeVariants({ status }), className)}
      {...props}
    >
      <span
        className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOTS[resolvedStatus])}
        aria-hidden="true"
      />
      {STATUS_LABELS[resolvedStatus]}
    </span>
  )
}
