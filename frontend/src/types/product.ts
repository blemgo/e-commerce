export interface ProductCategory {
  id: string;
  name: string;
  parentCategoryId?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  productImage?: string;
  qtyInStock: number;
  price: number;
  categories: ProductCategory[];
}

