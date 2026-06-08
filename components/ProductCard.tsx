import Link from 'next/link'
import type { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatPrice } from '@/lib/format'
import InventoryBadge from '@/components/InventoryBadge'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = getMetafieldValue(product.metadata?.name) || product.title
  const image = product.metadata?.product_image
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const hasSale = typeof salePrice === 'number' && salePrice > 0 && typeof price === 'number' && salePrice < price

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
            🛍️
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2">
          <InventoryBadge status={product.metadata?.inventory_status} />
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
          {name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          {hasSale ? (
            <>
              <span className="text-lg font-bold text-red-600">{formatPrice(salePrice)}</span>
              <span className="text-sm text-gray-400 line-through">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}