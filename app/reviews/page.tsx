import { getReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export const metadata = {
  title: 'Reviews | My Online Store',
  description: 'Read verified customer reviews.',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (Number(r.metadata?.rating) || 0), 0) / reviews.length
      : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Customer Reviews</h1>
        {reviews.length > 0 && (
          <p className="text-gray-600 mt-2">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} · Average rating{' '}
            <span className="font-semibold text-gray-900">{avgRating.toFixed(1)}</span> / 5
          </p>
        )}
      </div>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  )
}