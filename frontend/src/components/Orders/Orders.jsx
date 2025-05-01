import style from "./Orders.module.css";

import { useEffect } from "react";
import { selectOrders, selectProductsOfOrder } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchProductsOfOrder } from "../../redux/operations";

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

  const orderList = orders.map((order) => {
    return (
      <li key={order.id} className={style.orderBox}>
        <p>{order.title}</p>
        <p>{order.date}</p>
        <p>{order.description}</p>
        <button onClick={() => handleOrderClick(order.id)}>
          Show products
        </button>
      </li>
    );
  });

  return (
    <div>
      <ul className={style.ulWrapper}>{orderList}</ul>
    </div>
  );
};
