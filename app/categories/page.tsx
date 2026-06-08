import { getCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const metadata = {
  title: 'Categories | My Online Store',
  description: 'Browse our product categories.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600 mt-2">Explore products organized by category</p>
      </div>
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No categories found.</p>
      )}
    </div>
  )
}