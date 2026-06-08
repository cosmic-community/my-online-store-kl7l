export function formatPrice(price: number | undefined): string {
  if (price === undefined || price === null || isNaN(price)) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}