// app/categories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategory, getProductsByCategory } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.category_image

  return (
    <div>
      {/* Banner */}
      <div className="relative h-56 md:h-72 bg-gray-800 overflow-hidden">
        {image ? (
          <img
            src={`${image.imgix_url}?w=2400&h=600&fit=crop&auto=format,compress`}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
          <nav className="text-sm text-gray-200 mb-2">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-white">
              Categories
            </Link>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{name}</h1>
          {description && <p className="text-gray-200 mt-2 max-w-2xl">{description}</p>}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 mb-6">
          {products.length} {products.length === 1 ? 'product' : 'products'} in this category
        </p>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products in this category yet.</p>
        )}
      </div>
    </div>
  )
}