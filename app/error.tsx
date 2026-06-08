'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h2>
      <p className="text-gray-600 mb-6">{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={reset}
        className="inline-flex items-center px-5 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}