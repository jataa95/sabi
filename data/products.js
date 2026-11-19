// Product catalogue. Prices are PLACEHOLDERS in Naira: replace them with the real prices.
export const categories = [
  { slug: "t-shirts", label: "T-Shirts" },
  { slug: "shirts", label: "Shirts" },
  { slug: "hoodies", label: "Hoodies" },
  { slug: "tanks", label: "Tanks" },
  { slug: "tracksuits", label: "Tracksuits" },
  { slug: "accessories", label: "Accessories" },
];

const tee = ["S", "M", "L", "XL", "XXL"];

export const products = [
  {
    slug: "on-top-of-the-world-tee",
    name: "On Top Of The World Tee",
    category: "t-shirts",
    price: 25000,
    images: ["/media/tee-on-top-of-the-world.jpg"],
    colour: "White",
    sizes: tee,
    tags: ["new", "best"],
    description:
      "Heavyweight white tee with \"On Top Of The World\" printed big across the back in black graffiti letters, signed off with the Sabilifestyle script in red.",
    material: ["100% cotton, heavyweight", "Boxy, dropped-shoulder fit", "Wash inside out, cold. Do not iron the print."],
  },
  {
    slug: "globe-tee-black",
    name: "Globe Tee — Black",
    category: "t-shirts",
    price: 25000,
    images: ["/media/model-dab-tee-black.jpg"],
    colour: "Black",
    sizes: tee,
    tags: ["best"],
    description:
      "Black oversized tee with the Sabilifestyle script over our dabbing-on-the-globe character. Easy with baggy denim or cargos.",
    material: ["100% cotton", "Oversized fit", "Wash inside out, cold. Do not iron the print."],
  },
  {
    slug: "globe-tee-white",
    name: "Globe Tee — White",
    category: "t-shirts",
    price: 25000,
    images: ["/media/model-dab-tee-white.jpg"],
    colour: "White",
    sizes: tee,
    tags: ["new", "best"],
    description:
      "The Globe Tee in white: the same character on top of the world, printed full colour on a clean white oversized tee.",
    material: ["100% cotton", "Oversized fit", "Wash inside out, cold. Do not iron the print."],
  },
  {
    slug: "sabi-logo-tee",
    name: "SABI Logo Tee",
    category: "t-shirts",
    price: 22000,
    images: ["/media/model-sabi-tee.jpg"],
    colour: "Black",
    sizes: tee,
    tags: ["new", "best"],
    description: "The one that says it plainly. Black boxy tee, SABI wordmark across the chest in white.",
    material: ["100% cotton", "Boxy, cropped fit", "Wash inside out, cold."],
  },
  {
    slug: "stripe-zip-shirt",
    name: "Stripe Zip Shirt",
    category: "shirts",
    price: 35000,
    images: ["/media/stripe-shirt-flat.jpg", "/media/model-stripe-shirt.jpg", "/media/duo-stripe-shirts.jpg"],
    colour: "Blue / White stripe",
    sizes: tee,
    tags: ["new", "best"],
    description:
      "Short-sleeve blue and white stripe shirt that closes with a full zip instead of buttons. Script embroidery on both chest panels and a red SABI tab at the hem.",
    material: ["Cotton blend", "Relaxed, boxy fit", "Machine wash cold, warm iron on the reverse."],
  },
  {
    slug: "sabilifestyle-hoodie",
    name: "Sabilifestyle Hoodie",
    category: "hoodies",
    price: 45000,
    images: ["/media/hoodie-sabilifestyle.jpg"],
    colour: "Black",
    sizes: tee,
    tags: ["best"],
    description: "Heavy black hoodie with SABILIFESTYLE across the chest in red. Kangaroo pocket, ribbed cuffs and hem.",
    material: ["Cotton-rich fleece", "Oversized fit", "Wash inside out, cold. Do not tumble dry."],
  },
  {
    slug: "rare-on-purpose-hoodie",
    name: "Rare On Purpose Hoodie",
    category: "hoodies",
    price: 45000,
    images: ["/media/hoodie-rare-on-purpose.jpg"],
    colour: "Black",
    sizes: tee,
    tags: ["new"],
    description: "\"I'm rare on purpose.\" Black heavyweight hoodie, statement printed across the back in white and red.",
    material: ["Cotton-rich fleece", "Oversized fit", "Wash inside out, cold. Do not tumble dry."],
  },
  {
    slug: "big-dreams-tank",
    name: "Big Dreams Tank",
    category: "tanks",
    price: 20000,
    images: ["/media/tanks-big-dreams.jpg", "/media/duo-big-dreams.jpg"],
    colour: "Black or White",
    colours: ["Black", "White"],
    sizes: tee,
    tags: ["new", "best"],
    description:
      "Sleeveless tank with a basketball breaking through glass and BIG DREAMS underneath. Made for the court and everywhere after it.",
    material: ["100% cotton", "Relaxed fit, wide armholes", "Wash inside out, cold."],
  },
  {
    slug: "sabi-tracksuit",
    name: "SABI Tracksuit",
    category: "tracksuits",
    price: 75000,
    images: ["/media/tracksuit-flat.jpg", "/media/duo-tracksuit-red.jpg"],
    colour: "Black / Red",
    sizes: tee,
    tags: ["new", "best"],
    description:
      "Two-piece track set: zip jacket with red shoulder panels and white piping, and matching pants with a red and white stripe down each leg. SABI on the chest and the thigh.",
    material: ["Polyester tricot", "Regular fit jacket, straight-leg pant", "Machine wash cold. Do not iron the logos."],
  },
  {
    slug: "sabi-beanie",
    name: "Sabilifestyle Beanie",
    category: "accessories",
    price: 15000,
    images: ["/media/beanies-poster.jpg"],
    video: "/media/beanies.mp4",
    colour: "Black or Cream",
    colours: ["Black", "Cream"],
    sizes: ["One size"],
    tags: ["new"],
    description: "Chunky rib-knit beanie with a woven Sabilifestyle label on the cuff. In black and in cream.",
    material: ["Acrylic rib knit", "One size, stretch fit", "Hand wash cold, dry flat."],
  },
];

export const formatPrice = (n) => "₦" + n.toLocaleString("en-NG");

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const byTag = (tag) => products.filter((p) => p.tags.includes(tag));

export const drops = [
  {
    name: "Big Dreams",
    copy: "Basketball through the glass. Tanks for the court and after.",
    image: "/media/duo-big-dreams.jpg",
    href: "/shop/big-dreams-tank",
  },
  {
    name: "Stripe Set",
    copy: "Blue and white stripes, zip-front, worn in pairs.",
    image: "/media/duo-stripe-shirts.jpg",
    href: "/shop/stripe-zip-shirt",
  },
  {
    name: "Track Season",
    copy: "Black and red two-piece, white piping, SABI on the chest.",
    image: "/media/duo-tracksuit-red.jpg",
    href: "/shop/sabi-tracksuit",
  },
];
