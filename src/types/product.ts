export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: string;
  collection: string;
  price: string;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  description: string[];
  material: string;
  finish: string;
  dimensions: string;
  weight: string;
  stock: number;
  editorNotes: string;
  images: string[];
}
