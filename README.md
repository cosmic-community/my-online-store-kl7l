# My Online Store

![App Preview](https://imgix.cosmicjs.com/b58fb1a0-6376-11f1-ac8c-330ac011d850-autopilot-photo-1588850561407-ed78c282e89b-1780949692808.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern e-commerce storefront built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Browse products, explore categories, view variants, and read verified customer reviews — all powered by your existing Cosmic content.

## Features

- 🛍️ **Product Catalog** — Browse all products with images, pricing, sale prices, SKU, and inventory status
- 🏷️ **Category Browsing** — Explore products organized by category with category images
- 🎨 **Product Variants** — View product variant options on detail pages
- ⭐ **Customer Reviews** — Read verified-purchase reviews with star ratings on each product
- 💰 **Sale Pricing** — Automatic display of discounted prices when on sale
- 📦 **Inventory Status** — Real-time inventory status badges (In Stock / Out of Stock / etc.)
- 📱 **Fully Responsive** — Beautiful experience across mobile, tablet, and desktop
- ⚡ **Server Components** — Fast, SEO-friendly rendering with Next.js App Router

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a27226e7da35436b1092765&clone_repository=6a2723767da35436b1093982)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Cosmic SDK** ([@cosmicjs/sdk](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `categories`, `products`, and `reviews` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables (these are provided automatically when cloning via Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all products with connected category data
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug })
  .depth(1)

// Fetch reviews for a specific product
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': product.id })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with the following [Cosmic](https://www.cosmicjs.com/docs) object types:

- **Products** (`products`): name, description, price, sale_price, sku, inventory_status, product_image, gallery, variants, category
- **Categories** (`categories`): name, description, category_image
- **Reviews** (`reviews`): reviewer_name, rating, review_title, review_content, verified_purchase, product

All data is fetched server-side using Server Components for optimal performance and security.

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify
1. Push your code to GitHub
2. Connect the repository to [Netlify](https://netlify.com)
3. Add the environment variables
4. Deploy

<!-- README_END -->