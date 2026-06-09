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

export interface ProductFilters {
  category?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price';
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}
