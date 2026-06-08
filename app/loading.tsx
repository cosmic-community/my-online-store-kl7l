export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="animate-pulse space-y-8">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl aspect-square" />
          ))}
        </div>
      </div>
    </div>
  )
}