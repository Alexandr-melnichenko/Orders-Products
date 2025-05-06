import { NavLink } from "react-router";
import style from "./NavigationMenu.module.css";

export const NavigationMenu = () => {
  return (
    <div className={style.navContainer}>
      <NavLink to="/orders" className={style.links}>
        Orders
      </NavLink>
      <NavLink to="/groups" className={style.links}>
        Groups
      </NavLink>
      <NavLink to="/products" className={style.links}>
        Products
      </NavLink>
    </div>
  );
};
