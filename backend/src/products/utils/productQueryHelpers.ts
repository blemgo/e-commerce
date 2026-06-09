import { SelectQueryBuilder } from 'typeorm';
import { Product } from '../entities/product.entity';
import { GetProductsQueryDto } from '../dto/get-products-query.dto';

export interface PaginatedProducts {
  data: Product[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export const applyQuery = (
  qb: SelectQueryBuilder<Product>,
  query: GetProductsQueryDto,
): void => {
  const NAME_QUERY = 'product.name ILIKE :name';
  const MIN_PRICE_QUERY = 'product.price >= :minPrice';
  const MAX_PRICE_QUERY = 'product.price <= :maxPrice';

  if (query.name) {
    qb.andWhere(NAME_QUERY, { name: `%${query.name}%` });
  }

  if (query.minPrice) {
    console.log('minPrice', query.minPrice);
    qb.andWhere(MIN_PRICE_QUERY, { minPrice: query.minPrice });
  }

  if (query.maxPrice) {
    qb.andWhere(MAX_PRICE_QUERY, { maxPrice: query.maxPrice });
  }

  if (query.sortBy) {
    qb.orderBy(`product.${query.sortBy}`, query.sortOrder ?? 'ASC');
  }
};

export const applyPagination = async (
  qb: SelectQueryBuilder<Product>,
  query: GetProductsQueryDto,
): Promise<PaginatedProducts> => {
  if (!query.page && !query.limit) {
    const data = await qb.getMany();

    return { data, totalCount: data.length, page: 1, totalPages: 1 };
  }

  const page = query.page ?? 1;
  const limit = query.limit ?? 20;

  qb.skip((page - 1) * limit).take(limit);

  const [data, totalCount] = await qb.getManyAndCount();

  return { data, totalCount, page, totalPages: Math.ceil(totalCount / limit) };
};

export const applyCategoryFilter = async (
  qb: SelectQueryBuilder<Product>,
  query: GetProductsQueryDto,
  getDescendantCategoryIds: (categoryId: string) => Promise<string[]>,
): Promise<void> => {
  if (!query.category) {
    return;
  }

  const ids = await getDescendantCategoryIds(query.category);

  qb.andWhere(
    `EXISTS (
      SELECT 1 FROM bally.product_category_link pcl
      WHERE pcl.product_id = product.id
      AND pcl.product_category_id IN (:...ids)
    )`,
    { ids },
  );
};
