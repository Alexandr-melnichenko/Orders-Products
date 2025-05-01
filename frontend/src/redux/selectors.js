export const selectOrders = (state) => state.orders.orders;
export const selectActiveOrder = (state) => state.orders.activeOrder;

export const selectProducts = (state) => state.products.products;
export const selectActiveProduct = (state) => state.products.activeProduct;
export const selectProductsOfOrder = (state) => state.products.productsOfOrder;
export const selectProductsOfType = (state) =>
  state.products.productsFilteredOfType;
