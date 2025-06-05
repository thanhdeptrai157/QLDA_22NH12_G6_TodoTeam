export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 w-2/3 bg-gray-200 rounded mb-4" />
      <div className="h-6 w-1/3 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-1/4 bg-gray-100 rounded mb-6" />
      <div className="h-80 w-full bg-gray-200 rounded mb-6" />
      <div className="h-32 w-full bg-gray-100 rounded mb-8" />
      <div className="h-64 w-full bg-gray-200 rounded mb-8" />
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-24 w-full bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  )
}