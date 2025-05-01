import style from "./Orders.module.css";

import { useEffect } from "react";
import { selectOrders } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/operations";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  console.log("orders:", orders);
  // const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchOrders());
    console.log("orders.data:", orders);
  }, [dispatch]);

  const orderList = orders.map((order) => {
    return (
      <li key={order.id} className={style.orderBox}>
        <p>{order.title}</p>
        <p>{order.date}</p>
        <p>{order.description}</p>
      </li>
    );
  });

  return (
    <div>
      <ul className={style.ulWrapper}>{orderList}</ul>
    </div>
  );
};
