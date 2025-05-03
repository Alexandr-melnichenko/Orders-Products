import style from "./Orders.module.css";
import { useEffect } from "react";
import { selectOrders, selectProductsOfOrder } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchProductsOfOrder } from "../../redux/operations";
import { IoTrashOutline } from "react-icons/io5";
import { selectOrder } from "../../redux/slices/orderSlice";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  console.log("orders:", orders);
  const productsOfOrder = useSelector(selectProductsOfOrder);

  useEffect(() => {
    dispatch(fetchOrders());
    console.log("orders.data:", orders);
  }, [dispatch]);

  const handleOrderClick = (orderId, orderTitle) => {
    dispatch(fetchProductsOfOrder(orderId));
    dispatch(selectOrder(orderTitle));
    console.log("Товары заказа:", productsOfOrder);
  };

  const orderList = orders.map((order) => {
    return (
      <li
        key={order.id}
        className={style.orderBox}
        onClick={() => handleOrderClick(order.id, order.title)}
      >
        <p>{order.title}</p>
        <div className={style.orderDeleteBtn}>
          <svg className={style.orderDeleteBtnIconTrash}>
            <use xlinkHref="/sprite.svg#icon-card-list" />
          </svg>
        </div>

        <p>{order.products_count} products</p>
        <p>{order.date}</p>
        <p>{order.products_summ_USD} $ |</p>
        <p> {order.products_summ_UAH} UAH</p>
        <button className={style.orderDeleteBtn}>
          <svg className={style.orderDeleteBtnIconTrash}>
            <use xlinkHref="/sprite.svg#icon-trash" />
          </svg>
        </button>
      </li>
    );
  });

  return (
    <div className={style.container}>
      <ul className={style.ulWrapper}>{orderList}</ul>
    </div>
  );
};
