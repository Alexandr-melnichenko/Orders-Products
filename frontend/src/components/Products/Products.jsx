import style from "./Products.module.css";
import { useEffect, useState } from "react";
import { selectProducts } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/operations";
const BASE_URL = "http://localhost:3000";

export const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { totalPages, loading, error } = useSelector((state) => state.products);

  const products = useSelector(selectProducts);
  console.log("Products:", products);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
    console.log("products.data:", products);
  }, [dispatch, currentPage]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  const productsList = products.map((product) => {
    return (
      <li key={product.id} className={style.productBox}>
        <p>{product.title}</p>
        <div className={style.imgContainer}>
          <img
            src={`${BASE_URL}${product.photo_url}`}
            alt={product.title}
            className={style.productImage}
          />
        </div>
        <p>Serial: {product.serial_number}</p>
        <p>Type: {product.type}</p>
        <p>{product.specification}</p>
        <p>Status: {product.is_new ? "New" : "Used"}</p>
        {product.prices && product.prices.length > 0 && (
          <p className="price">
            Price: {product.prices[0].value} {product.prices[0].symbol}
          </p>
        )}
        {product.guarantee && (
          <div className={style.guarantee}>
            <p>Warranty:</p>
            <p>
              From: {new Date(product.guarantee.start).toLocaleDateString()}
            </p>
            <p>To: {new Date(product.guarantee.end).toLocaleDateString()}</p>
          </div>
        )}

        {product.order && (
          <p className={style.orderInfo}>
            Order: #{product.order.id} - {product.order.title}
          </p>
        )}
      </li>
    );
  });

  return (
    <div className={style.productsContainer}>
      <h2>All Products</h2>
      <div className={style.pagination}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <ul className={style.ulWrapper}>{productsList}</ul>
    </div>
  );
};
