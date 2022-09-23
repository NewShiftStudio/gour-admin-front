import { Product } from './SelectForm';

// eslint-disable-next-line
export const isProductSelected = (productId: number, selectedProductIds: number[]) =>
  selectedProductIds.includes(productId);

export const filterProductBySelects = (
  product: Product,
  selectsValues: Record<string, string | undefined>
) =>
  Object.keys(product.categories).every(key => {
    if (!selectsValues[key]) return true;
    return false; // FIXME:
    // return selectsValues[key] === product.categories[key]; // FIXME:
  });

export const filterProductByTab = (
  tabId: string | number,
  product: Product,
  selectedProductIds: number[]
) => {
  if (tabId === 'selected') {
    return isProductSelected(product.id, selectedProductIds);
  }

  const isProductTypeId = typeof tabId === 'number'; // FIXME: бесполезная проверка, вроде как
  if (isProductTypeId) {
    return product.categories?.some(category => category.id === tabId);
  }
  return product.category === tabId || tabId === 'all';
};

// eslint-disable-next-line
export const filterProductByQuery = (product: Product, searchQuery: string) => {
  const query = searchQuery.trim().toLowerCase();
  const title = product.title.toLowerCase();

  return title.includes(query);
};

export const filterByAllParams = (
  products: Product[],
  query: string,
  selectsValues: Record<string, string | undefined>,
  selectedTabKey: string,
  selectedProductIds: number[]
) =>
  products.filter(product => {
    const isPassedBySelects = true || filterProductBySelects(product, selectsValues); // FIXME:
    const isPassedByQuery = filterProductByQuery(product, query);
    const isPassedByTab = filterProductByTab(selectedTabKey, product, selectedProductIds);

    return isPassedBySelects && isPassedByQuery && isPassedByTab;
  });
