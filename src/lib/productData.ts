export interface Product {
  id: string;
  title: string;
  description: string;
  image: string; // URL to image
  category: string; // e.g., 'lipstick', 'foundation'
  brand: string;
  price: number;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Velvet Matte Lipstick",
    description: "Long-lasting matte lipstick with rich pigments.",
    image: "/images/lipstick.avif",
    category: "lipstick",
    brand: "GlamBeauty",
    price: 12.99,
  },
  {
    id: "2",
    title: "Hydrating Foundation",
    description: "Smooth, hydrating foundation for all-day wear.",
    image: "/images/foundation.avif",
    category: "foundation",
    brand: "GlowSkin",
    price: 18.5,
  },
  {
    id: "3",
    title: "Waterproof Mascara",
    description: "Lift and curl your lashes with our waterproof formula.",
    image: "/images/mascara.avif",
    category: "mascara",
    brand: "LashPro",
    price: 10.0,
  },
  {
    id: "4",
    title: "Makeup Brush Set",
    description: "A premium 10-piece makeup brush set perfect for foundation, eyeshadow, and blending. Soft, cruelty-free bristles ensure flawless application.",
    image: "/images/brush.avif",
    category: "brush",
    brand: "GlamTools",
    price: 20.00,
  },
  {
    id: "5",
    title: "Shimmer Eyeshadow Palette",
    description: "12-shade shimmer palette for a glam look.",
    image: "/images/eyeshadow.avif",
    category: "eyeshadow",
    brand: "ColorPop",
    price: 15.75,
  },
  {
    id: "6",
    title: "Waterproof Mascara",
    description: "Lift and curl your lashes with our waterproof formula.",
    image: "/images/mascara.avif",
    category: "mascara",
    brand: "LashPro",
    price: 10.0,
  },
  {
    id: "7",
    title: "Makeup Brush Set",
    description: "A premium 10-piece makeup brush set perfect for foundation, eyeshadow, and blending. Soft, cruelty-free bristles ensure flawless application.",
    image: "/images/brush.avif",
    category: "brush",
    brand: "GlamTools",
    price: 20.00,
  },
  {
    id: "8",
    title: "Shimmer Eyeshadow Palette",
    description: "12-shade shimmer palette for a glam look.",
    image: "/images/eyeshadow.avif",
    category: "eyeshadow",
    brand: "ColorPop",
    price: 15.75,
  },
];

