import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const image = category.metadata?.category_image
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block rounded-xl overflow-hidden h-48 bg-gray-800"
    >
      {image ? (
        <img
          src={`${image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
          alt={name}
          width={400}
          height={200}
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-300"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-800" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-5">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        {description && (
          <p className="text-sm text-gray-200 line-clamp-1 mt-1">{description}</p>
        )}
      </div>
    </Link>
  )
}