export interface Produto {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images?: string[];
  brand?: string;
}

export interface RespostaProdutos {
  products: Produto[];
  total: number;
  skip: number;
  limit: number;
}