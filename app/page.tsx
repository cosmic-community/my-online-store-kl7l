import Link from 'next/link'
import { getProducts, getCategories, getReviews } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ])

  const featuredProducts = products.slice(0, 8)
  const featuredCategories = categories.slice(0, 3)
  const featuredReviews = reviews.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://imgix.cosmicjs.com/b0223a80-6376-11f1-ac8c-330ac011d850-autopilot-photo-1489987707025-afc232f7ea0f-1780949683745.jpeg?w=2400&h=900&fit=crop&auto=format,compress"
            alt="My Online Store"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-2xl leading-tight">
            Discover Products You'll Love
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-xl">
            Premium products, fair prices, and reviews you can trust — all in one beautiful store.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition-colors"
            >
              Shop Products
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      {featuredCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
            <Link href="/categories" className="text-brand-600 font-medium hover:text-brand-700">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-brand-600 font-medium hover:text-brand-700">
            View all →
          </Link>
        </div>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products available yet.</p>
        )}
      </section>

      {/* Reviews */}
      {featuredReviews.length > 0 && (
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Customers Say</h2>
              <Link href="/reviews" className="text-brand-600 font-medium hover:text-brand-700">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}