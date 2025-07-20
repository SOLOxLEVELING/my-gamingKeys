export const products = {
  // Product ID 1 corresponds to "Arian Freat X Keychron K8 Pro"
  1: {
    id: 1,
    name: "Arion Frost X Keychron K8 Pro",
    tags: ["Wireless", "Hot-swap"],
    rating: 4.8,
    reviewsCount: 23,
    originalPrice: "₹15,000.00",
    salePrice: "₹8,599.00",
    paymentInfo: "Flexible payments starting at ₹1333 /month",

    gallery: [
      {
        id: "g1",
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
      }, // Placeholder video
      {
        id: "g2",
        type: "image",
        url: "https://placehold.co/800x600/e0e0e0/000000?text=Keyboard+Main",
        thumb: "https://placehold.co/100x75/e0e0e0/000000?text=Thumb+1",
      },
      {
        id: "g3",
        type: "image",
        url: "https://placehold.co/800x600/d1d5db/000000?text=Keyboard+Angle",
        thumb: "https://placehold.co/100x75/d1d5db/000000?text=Thumb+2",
      },
      {
        id: "g4",
        type: "image",
        url: "https://placehold.co/800x600/9ca3af/ffffff?text=Keyboard+Side",
        thumb: "https://placehold.co/100x75/9ca3af/ffffff?text=Thumb+3",
      },
      {
        id: "g5",
        type: "image",
        url: "https://placehold.co/800x600/6b7280/ffffff?text=Keyboard+Back",
        thumb: "https://placehold.co/100x75/6b7280/ffffff?text=Thumb+4",
      },
    ],

    features: [
      "Ultimate keyboard upgraded (special Edition Keychron K8 Pro)",
      "Hot-swappable mechanical keyboard with Gateron G Pro 3.0 Mechanical key switches.",
      "Compatible with almost all the MX style 3pin and 5pin mechanical switches.",
      "Pre-built with aluminum frame (Except Borebone)",
      "Includes an Acrylic Dust cover designed to shield the keyboard from dust particles.",
      "QMK/VIA compatible for full customizability.",
      "Compatible with both Mac and Windows OS.",
    ],

    variants: {
      switches: [
        {
          id: "s1",
          name: "Gateron G Pro 3.0 Red",
          priceModifier: 0,
          image: "https://placehold.co/40x40/ef4444/ffffff?text=Red",
        },
        {
          id: "s2",
          name: "Gateron G Pro 3.0 Brown",
          priceModifier: 0,
          image: "https://placehold.co/40x40/a16207/ffffff?text=Brn",
        },
        {
          id: "s3",
          name: "Gateron G Pro 3.0 Yellow",
          priceModifier: 200,
          image: "https://placehold.co/40x40/facc15/000000?text=Yel",
        },
      ],
      colors: [
        { id: "c1", name: "White", colorHex: "#FFFFFF" },
        { id: "c2", name: "Black", colorHex: "#000000" },
      ],
    },

    description: `
  <div class="space-y-8">
    <div>
      <h3 class="text-2xl font-bold mb-4">A masterpiece of modern engineering</h3>
      <p class="text-gray-400">That's set to redefine your keyboard experience. The Arion Frost represents a pinnacle of custom mechanical keyboard design, blending premium materials with cutting-edge technology.</p>
    </div>
    <img src="http://googleusercontent.com/file_content/0" alt="Arion Frost Keyboard" class="w-full rounded-lg shadow-lg" />
    <div>
      <h3 class="text-2xl font-bold mb-4">Wired and Wireless</h3>
      <p class="text-gray-400">Enjoy the freedom of a wireless connection or the stability of a wired setup. The Arion Frost offers both, ensuring seamless performance for gaming and productivity.</p>
    </div>
  </div>
`,

    productDetails: [
      { label: "Connectivity", value: "Wireless" },
      { label: "Hotswappable", value: "Hot-swap" },
      { label: "Switch Brand", value: "Keychron, Gateron" },
      { label: "Switch type", value: "Mechanical" },
      { label: "Keycaps", value: "PBT" },
      { label: "Keycap Profile", value: "OSA" },
      { label: "Printing technology", value: "Double-shot" },
    ],

    reviews: [
      {
        id: "r1",
        author: "csk738 (verified owner)",
        date: "July 11, 2025",
        rating: 5,
        text: "package came fully seal packed, no tampering, no damage to the keyboard and it’s working perfectly fine.",
      },
      {
        id: "r2",
        author: "codeimperfect (verified owner)",
        date: "June 13, 2025",
        rating: 5,
        text: "Just awesome! The original Keychron K8 Pro, the Aluminum version and everything, for so much cheaper. I just thought I won’t like the color, but it looks much better inrl. It is hotswappable and fully supports QMK and VIA, so enjoying it on Arch Linux.",
      },
    ],
  },
  // You can add more product details here with other IDs...
};
