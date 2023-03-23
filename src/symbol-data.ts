import type { ReelSymbol } from './typings'

// Watermarked preview images from https://cdn4.iconfinder.com/data/icons/slot-machines<512/Lemon-512.png>
export const symbolData = [
  {
    name: 'Lemon',
    value: 2,
    image: '/symbol-images/Lemon-512.webp'
  },
  {
    name: 'Melon',
    value: 3,
    image: '/symbol-images/Watermelon-512.webp'
  },
  {
    name: 'Bananna',
    value: 6,
    image: '/symbol-images/Bananas-512.webp'
  },
  {
    name: 'Grapes',
    value: 16,
    image: '/symbol-images/Grapes-512.webp'
  },
  {
    name: 'Cherry',
    value: 32,
    image: '/symbol-images/Cherry-512.webp'
  },
  {
    name: 'Clover',
    value: 64,
    image: '/symbol-images/Clover-512.webp'
  },
  {
    name: 'Crown',
    value: 128,
    image: '/symbol-images/Crown-512.webp'
  },
  {
    name: 'Cash',
    value: 150,
    image: '/symbol-images/Dollars-512.webp'
  }
] as ReelSymbol[]

// For determining wins and rendering WinLegend.vue
export const cashSymbolData = [
  {
    name: '2Cash',
    value: 75,
    number: 2,
    image: '/symbol-images/Dollars-512.webp'
  },
  {
    name: '1Cash',
    value: 3,
    number: 1,
    image: '/symbol-images/Dollars-512.webp'
  }
] as ReelSymbol[]
