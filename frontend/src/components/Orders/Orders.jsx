import style from "./Orders.module.css";
import { Button, Alert } from "react-bootstrap";
import { useEffect } from "react";
import {
  selectOrders,
  selectProducts,
  selectProductsOfOrder,
} from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  fetchProducts,
  fetchProductsOfOrder,
} from "../../redux/operations";
const BASE_URL = "http://localhost:3000";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  console.log("orders:", orders);
  const productsOfOrder = useSelector(selectProductsOfOrder);

  useEffect(() => {
    dispatch(fetchOrders());
    console.log("orders.data:", orders);
  }, [dispatch]);

  const handleOrderClick = (orderId) => {
    dispatch(fetchProductsOfOrder(orderId));
    console.log("Товары заказа:", productsOfOrder);
  };

  useEffect(() => {
    console.log("Products of order:", productsOfOrder);
  }, [productsOfOrder]);

  const productsOfOrderList = productsOfOrder.map((product) => {
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

  const orderList = orders.map((order) => {
    return (
      <li key={order.id} className={style.orderBox}>
        <p>{order.title}</p>
        <p>{order.products_count} products</p>
        <p>{order.date}</p>
        <p>{order.products_summ_USD} $</p>
        <p>{order.products_summ_UAH} UAH</p>

        <Button onClick={() => handleOrderClick(order.id)}>
          Show products
        </Button>
      </li>
    );
  });

  return (
    <div className={style.container}>
      <ul className={style.ulWrapper}>{orderList}</ul>
      {productsOfOrder.length > 0 && (
        <ul className={style.ulProductsWrapper}>{productsOfOrderList}</ul>
      )}
    </div>
  );
};
