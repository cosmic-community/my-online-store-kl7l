import type { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = false }: ReviewCardProps) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Anonymous'
  const rating = review.metadata?.rating ?? 0
  const reviewTitle = getMetafieldValue(review.metadata?.review_title)
  const reviewContent = getMetafieldValue(review.metadata?.review_content)
  const verified = review.metadata?.verified_purchase === true
  const product = review.metadata?.product

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-2">
        <StarRating rating={Number(rating)} size="sm" />
        {verified && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
            ✓ Verified
          </span>
        )}
      </div>
      {reviewTitle && <h4 className="font-semibold text-gray-900 mb-1">{reviewTitle}</h4>}
      {reviewContent && <p className="text-sm text-gray-600 leading-relaxed">{reviewContent}</p>}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{reviewerName}</span>
        {showProduct && product && (
          <span className="text-gray-400">
            on {getMetafieldValue(product.metadata?.name) || product.title}
          </span>
        )}
      </div>
    </div>
  )
}