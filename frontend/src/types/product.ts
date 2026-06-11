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
  isActive: boolean;
  categories: ProductCategory[];
}

export interface CreateProductDTO {
  name: string;
  description?: string;
  productImage?: string;
  qtyInStock?: number;
  price: number;
  isActive?: boolean;
  categoryIds?: string[];
}

export type UpdateProductDTO = Partial<CreateProductDTO>;

