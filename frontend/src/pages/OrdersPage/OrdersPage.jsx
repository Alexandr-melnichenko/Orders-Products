import style from "./OrdersPage.module.css";
import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";
import { Orders } from "../../components/Orders/Orders";
import { TopMenu } from "../../components/TopMenu/TopMenu";
import { toast } from "react-toastify";

export const OrdersPage = () => {
  const handleBtnAddClick = () => {
    toast.success(
      "This button simulates calling the window for adding a new order! ",
      {
        position: "top-right",
        autoClose: 3000,
      }
    );
  };

  return (
    <>
      <TopMenu />
      <div className={style.ordersPageContainer}>
        <NavigationMenu />
        <div className={style.sectionWrapper}>
          <div className={style.titleBox}>
            <h1>Orders list</h1>
            <button
              className={style.orders__btnAddOrder}
              onClick={handleBtnAddClick}
            >
              <div className={style.orders__btnAddOrderIconWrap}>
                <svg className={style.orders__btnAddOrderIcon}>
                  <use xlinkHref="/sprite.svg#icon-plus" />
                </svg>
              </div>
              <p>Add order</p>
            </button>
          </div>
          <div className={style.ordersList}>
            <Orders />
          </div>
        </div>
      </div>
    </>
  );
};
