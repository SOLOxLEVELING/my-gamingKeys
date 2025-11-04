// This file contains all the generic, placeholder data
// for the product detail page.

export const placeholderProductDetails = {
  gallery: [
    {
      id: "g1",
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
      thumb: "https://placehold.co/100x75/9ca3af/ffffff?text=Video",
    },
    {
      id: "g2",
      type: "image",
      url: "https://placehold.co/800x600/3b3b3b/ffffff?text=Main+Image",
      thumb: "https://placehold.co/100x75/3b3b3b/ffffff?text=Thumb+1",
    },
    {
      id: "g3",
      type: "image",
      url: "https://placehold.co/800x600/4c4c4c/ffffff?text=Angle+View",
      thumb: "https://placehold.co/100x75/4c4c4c/ffffff?text=Thumb+2",
    },
    {
      id: "g4",
      type: "image",
      url: "https://placehold.co/800x600/5d5d5d/ffffff?text=Side+View",
      thumb: "https://placehold.co/100x75/5d5d5d/ffffff?text=Thumb+3",
    },
  ],
  features: [
    "Feature one for this product goes here.",
    "This is the second key feature, dynamically listed.",
    "A third point highlighting benefits or specs.",
    "QMK/VIA compatible for full customizability.",
    "Compatible with both Mac and Windows OS.",
  ],
  variants: {
    switches: [
      {
        id: "s1",
        name: "Varient 1",
        priceModifier: 0,
        image: "https://placehold.co/40x40/ef4444/ffffff?text=Red",
      },
      {
        id: "s2",
        name: "Varient 2",
        priceModifier: 400,
        image: "https://placehold.co/40x40/a16207/ffffff?text=Brn",
      },
      {
        id: "s3",
        name: "Varient 3",
        priceModifier: 800, // Example price increment
        image: "https://placehold.co/40x40/facc15/000000?text=Yel",
      },
    ],
    colors: [
      { id: "c1", name: "Color 1", colorHex: "#333333" },
      { id: "c2", name: "Color 2", colorHex: "#FFFFFF" },
    ],
  },
  description: `
    <div class="space-y-8">
      <div>
        <h3 class="text-2xl font-bold mb-4">Generic Product Description</h3>
        <p class="text-gray-400">This description is a placeholder and will be the same for all products. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
      </div>
      <img src="https://placehold.co/1200x400/3b3b3b/ffffff?text=Generic+Feature+Image" alt="Placeholder" class="w-full rounded-lg shadow-lg" />
      <div>
        <h3 class="text-2xl font-bold mb-4">Placeholder Feature Title</h3>
        <p class="text-gray-400">Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
      </div>
    </div>
  `,
  productDetails: [
    { label: "Connectivity", value: "Placeholder" },
    { label: "Hotswappable", value: "Yes (Placeholder)" },
    { label: "Switch Brand", value: "Generic Brand" },
    { label: "Switch type", value: "Mechanical (Placeholder)" },
    { label: "Keycaps", value: "PBT (Placeholder)" },
    { label: "Keycap Profile", value: "OEM (Placeholder)" },
  ],
  reviews: [
    {
      id: "r1",
      author: "Verified Customer",
      date: "July 11, 2025",
      rating: 5,
      text: "This is a generic review. The product works great and looks fantastic. Highly recommend!",
    },
    {
      id: "r2",
      author: "Design Student",
      date: "June 13, 2025",
      rating: 4,
      text: "Awesome placeholder text! Just what I needed to see how the reviews section looks. It's almost like real people wrote this. Almost.",
    },
  ],
  rating: 4.5,
  reviewsCount: 2,
  originalPrice: "₹10,000.00",
  paymentInfo: "Flexible payments available",
};
