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

## Cart and checkout (Paystack)

- The bag lives in the browser (localStorage). "Add to bag" on a product page opens the bag drawer.
- `/checkout` collects contact and delivery details. The server (`app/api/checkout/route.js`) re-prices the bag from `data/products.js`, so customers can't change the amount, then starts a Paystack transaction and sends the customer to Paystack's payment page.
- After paying, Paystack returns the customer to `/checkout/success`, which verifies the payment with Paystack before showing "Order placed".
- Each order's items, size, phone, delivery option and address appear on the transaction in your Paystack dashboard.

### Switch payments on

1. In Paystack, open **Settings → API Keys & Webhooks** and copy the **secret key** (`sk_test_...` for testing, `sk_live_...` for real payments).
2. In Vercel, open the project, then **Settings → Environment Variables**, and add `PAYSTACK_SECRET_KEY` with that key.
3. Redeploy. Until the key is set, checkout shows "Payments aren't switched on yet".

For local development, copy `.env.example` to `.env.local` and fill in the key.

Delivery fees are placeholders in `data/site.js` (`deliveryOptions`).
