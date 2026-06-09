// app/products/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, getReviewsByProduct, getBlocks, getMetafieldValue } from '@/lib/cosmic'
import { formatPrice } from '@/lib/format'
import InventoryBadge from '@/components/InventoryBadge'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'
import { RichText } from '@cosmicjs/rich-text'
import type { ObjectBlockProps, ResolvedObject } from '@cosmicjs/rich-text'
import type { ProductVariant, CosmicImage, Product } from '@/types'

// Inline embed component for products referenced via {{ object type="products" id="..." /}}
function EmbeddedProductCard({ object }: ObjectBlockProps) {
  if (!object) return null
  const name = getMetafieldValue(object.metadata?.name) || object.title
  const price = object.metadata?.price
  const image = object.metadata?.product_image as CosmicImage | undefined
  return (
    <Link
      href={`/products/${object.slug}`}
      className="not-prose flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow my-4"
    >
      {image?.imgix_url ? (
        <img
          src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
          alt={name}
          width={80}
          height={80}
          className="rounded-lg object-cover w-20 h-20 shrink-0"
        />
      ) : (
        <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-3xl shrink-0">
          🛍️
        </div>
      )}
      <div className="min-w-0">
        <p className="font-semibold text-gray-900 truncate">{name}</p>
        {typeof price === 'number' && (
          <p className="text-sm text-brand-600 font-medium mt-1">{formatPrice(price)}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">View product →</p>
      </div>
    </Link>
  )
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [product, blocks] = await Promise.all([
    getProduct(slug),
    getBlocks(),
  ])

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)

  const name = getMetafieldValue(product.metadata?.name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const sku = getMetafieldValue(product.metadata?.sku)
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const hasSale =
    typeof salePrice === 'number' && salePrice > 0 && typeof price === 'number' && salePrice < price
  const mainImage = product.metadata?.product_image
  const gallery = product.metadata?.gallery
  const variants = product.metadata?.variants
  const category = product.metadata?.category

  // Build an id→object map from the related_products field for resolveObject
  const relatedProducts: Product[] = product.metadata?.related_products ?? []
  const relatedById = new Map(relatedProducts.map((p) => [p.id, p]))

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (Number(r.metadata?.rating) || 0), 0) / reviews.length
      : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-brand-600">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            {mainImage ? (
              <img
                src={`${mainImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-7xl">
                🛍️
              </div>
            )}
          </div>
          {gallery && gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {gallery.slice(0, 8).map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                >
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${name} gallery ${i + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-sm font-medium text-brand-600 hover:text-brand-700 mb-2"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <StarRating rating={avgRating} size="sm" />
              <span className="text-sm text-gray-500">
                {avgRating.toFixed(1)} ({reviews.length}{' '}
                {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            {hasSale ? (
              <>
                <span className="text-3xl font-bold text-red-600">{formatPrice(salePrice)}</span>
                <span className="text-xl text-gray-400 line-through">{formatPrice(price)}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">{formatPrice(price)}</span>
            )}
          </div>

          <div className="mt-4">
            <InventoryBadge status={product.metadata?.inventory_status} />
          </div>

          {sku && (
            <p className="text-sm text-gray-500 mt-3">
              SKU: <span className="font-medium text-gray-700">{sku}</span>
            </p>
          )}

          {description && (
            <div className="mt-6 prose prose-sm text-gray-700 max-w-none">
              <RichText
                value={description}
                blocks={blocks}
                objects={{ products: EmbeddedProductCard }}
                resolveObject={({ id }) => relatedById.get(id) as ResolvedObject | undefined}
              />
            </div>
          )}

          {/* Variants */}
          {variants && variants.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Available Options</h3>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant: ProductVariant, i: number) => {
                  const variantName =
                    getMetafieldValue(variant?.name) ||
                    getMetafieldValue(variant?.value) ||
                    `Option ${i + 1}`
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700"
                    >
                      {variantName}
                      {typeof variant?.price === 'number' && (
                        <span className="ml-2 text-gray-500">{formatPrice(variant.price)}</span>
                      )}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews {reviews.length > 0 && `(${reviews.length})`}
        </h2>
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet for this product.</p>
        )}
      </section>
    </div>
  )
}
