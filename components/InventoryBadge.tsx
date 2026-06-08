import { getMetafieldValue } from '@/lib/cosmic'

interface InventoryBadgeProps {
  status: unknown
}

export default function InventoryBadge({ status }: InventoryBadgeProps) {
  const value = getMetafieldValue(status)
  if (!value) return null

  const lower = value.toLowerCase()
  let colorClass = 'bg-gray-100 text-gray-700'

  if (lower.includes('out')) {
    colorClass = 'bg-red-100 text-red-700'
  } else if (lower.includes('low')) {
    colorClass = 'bg-yellow-100 text-yellow-800'
  } else if (lower.includes('pre')) {
    colorClass = 'bg-blue-100 text-blue-700'
  } else if (lower.includes('in stock')) {
    colorClass = 'bg-green-100 text-green-700'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}>
      {value}
    </span>
  )
}