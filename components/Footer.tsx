import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold flex items-center gap-2 mb-3">
              <span>🛍️</span> My Online Store
            </h3>
            <p className="text-sm text-gray-400">
              Quality products, fair prices, and reviews you can trust.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">About</h4>
            <p className="text-sm text-gray-400">
              Built with Next.js and Cosmic. A modern headless commerce experience.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-500">
          &copy; {year} My Online Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}