// components/CTABlock.tsx
// Rendered whenever {{cta /}} appears in a rich-text description.
// Styled to match the store's brand-indigo palette.

import Link from 'next/link'

export default function CTABlock() {
  return (
    <div className="not-prose my-8 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-10 text-center shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-200 mb-2">
        Limited time offer
      </p>
      <h3 className="text-2xl font-bold text-white mb-3">
        Love what you see?
      </h3>
      <p className="text-brand-100 text-sm mb-6 max-w-sm mx-auto">
        Add this item to your cart today and enjoy free shipping on orders over $50.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow hover:bg-brand-50 transition-colors"
        >
          🛍️ Shop All Products
        </Link>
        <Link
          href="/categories"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-400 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          Browse Categories
        </Link>
      </div>
    </div>
  )
}
