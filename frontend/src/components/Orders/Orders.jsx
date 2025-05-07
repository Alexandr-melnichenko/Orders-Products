import style from "./Orders.module.css";
import { useEffect, useState } from "react";
import { selectOrders, selectProductsOfOrder } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchProductsOfOrder } from "../../redux/operations";
import { IoTrashOutline } from "react-icons/io5";
import { selectOrder } from "../../redux/slices/orderSlice";
import { DeleteBtnIcon } from "../DeleteBtnIcon/DeleteBtnIcon";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  console.log("orders:", orders);
  const productsOfOrder = useSelector(selectProductsOfOrder);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState(null);

  const handleDeleteClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${style.orderBox}`)) {
        setActiveOrderId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const smallFormatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
    }).format(new Date(dateString));
  };

  useEffect(() => {
    dispatch(fetchOrders());
    console.log("orders.data:", orders);
  }, [dispatch]);

  const handleOrderClick = (orderId, orderTitle) => {
    dispatch(fetchProductsOfOrder(orderId));
    dispatch(selectOrder(orderTitle));
    setActiveOrderId(orderId);
    console.log("Товары заказа:", productsOfOrder);
  };

  const orderList = orders.map((order) => {
    return (
      <li
        key={order.id}
        className={`${style.orderBox} ${
          activeOrderId === order.id ? style.orderBoxActive : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleOrderClick(order.id, order.title);
        }}
      >
        <p className={style.p}>{order.title}</p>
        <div className={style.orderBox__divIconList}>
          <svg className={style.orderBox__iconList}>
            <use xlinkHref="/sprite.svg#icon-list" />
          </svg>
        </div>
        <div>
          <p className={style.p}>{order.products_count}</p>
          <p className={`${style.p} ${style.smallGrayText}`}>products</p>
        </div>

        <div className={style.dateContainer}>
          <p className={`${style.p} ${style.smallGrayText}`}>
            {smallFormatDate(order.date)}
          </p>
          <p className={style.p}>{formatDate(order.date)}</p>
        </div>

        <div className={style.priceContainer}>
          <p className={`${style.p} ${style.smallGrayText}`}>
            {order.products_summ_USD} $
          </p>
          <p className={style.p}>{order.products_summ_UAH} UAH</p>
        </div>

        <DeleteBtnIcon
          variant="danger"
          onClick={(e) => {
            e?.stopPropagation?.();
            handleDeleteClick(order);
          }}
        />
      </li>
    );
  });

  return (
    <div className={style.container}>
      <ul className={style.ulWrapper}>{orderList}</ul>
      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        bodyText={
          selectedOrder &&
          `Are you sure you want to delete the parish "${selectedOrder.title}"?`
        }
      />
    </div>
  );
};
