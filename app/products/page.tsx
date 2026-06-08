import { getProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export const metadata = {
  title: 'Products | My Online Store',
  description: 'Browse our full catalog of products.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-600 mt-2">
          {products.length} {products.length === 1 ? 'product' : 'products'} available
        </p>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  )
}