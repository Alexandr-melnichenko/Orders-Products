import style from "./OrdersPage.module.css";
import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";
import { Orders } from "../../components/Orders/Orders";
import { TopMenu } from "../../components/TopMenu/TopMenu";

export const OrdersPage = () => {
  return (
    <>
      <TopMenu />

      <div className={style.ordersPageContainer}>
        <NavigationMenu />
        <Orders />
      </div>
    </>
  );
};
