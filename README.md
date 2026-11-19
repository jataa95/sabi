# SABI LIFESTYLE

Website for SABI LIFESTYLE, a clothing brand from Lagos, Nigeria ([@_sabilifestyle](https://www.instagram.com/_sabilifestyle/)).

Built with Next.js 16 (App Router) and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Pages

- `/` home: hero, about, latest drops, best sellers, why Sabi, categories, new arrivals, social wall, walk-in store
- `/shop` all products, with category, new-arrivals and price-sort filters (`/shop?category=hoodies`, `/shop?filter=new`)
- `/shop/[slug]` product page: gallery, colour and size pickers, "Order on Instagram", size guide, FAQs, related pieces
- `/about` brand story, video, FAQs

## Editing content

- Products, prices, drops: `data/products.js`. **The prices are placeholders**, so replace them with the real ones.
- Instagram links, location, FAQs: `data/site.js`
- Photos and videos: `public/media/`

## Ordering

There is no cart or payment. "Order on Instagram" copies an order message (product, colour, size, quantity) to the clipboard and opens a DM with @_sabilifestyle.
