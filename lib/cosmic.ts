import { createBucketClient } from '@cosmicjs/sdk'
import type { Product, Category, Review } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render metadata values in JSX
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Fetch bucket block definitions for RichText rendering
export async function getBlocks() {
  try {
    const response = await cosmic.blocks.find()
    return response.blocks ?? []
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blocks')
  }
}

/**
 * Extract all object IDs from {{ object ... id="ID" ... /}} tokens in a rich-text string.
 * These are used to pre-fetch embedded objects for RichText resolveObject.
 */
export function extractEmbedIds(richText: string): string[] {
  const ids: string[] = []
  const re = /\{\{\s*object\b[^}]*\bid="([^"]+)"/g
  let match: RegExpExecArray | null
  while ((match = re.exec(richText)) !== null) {
    ids.push(match[1])
  }
  return [...new Set(ids)]
}

/**
 * Fetch a batch of objects by their IDs.
 * Returns a Map of id -> object for use with RichText resolveObject.
 */
export async function getObjectsById(ids: string[]): Promise<Map<string, Record<string, unknown>>> {
  if (ids.length === 0) return new Map()
  try {
    const response = await cosmic.objects
      .find({ 'id[in]': ids.join(',') })
      .props(['id', 'title', 'slug', 'type', 'metadata'])
      .depth(1)
    const map = new Map<string, Record<string, unknown>>()
    for (const obj of response.objects ?? []) {
      map.set(obj.id, obj as Record<string, unknown>)
    }
    return map
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return new Map()
    }
    throw new Error('Failed to fetch embedded objects')
  }
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products')
  }
}

// Fetch a single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .depth(1)
    return response.object as Product
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch product')
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Fetch a single category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .depth(1)
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// Fetch products for a specific category
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products by category')
  }
}

// Fetch all reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}

// Fetch reviews for a specific product
export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews', 'metadata.product': productId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews by product')
  }
}
