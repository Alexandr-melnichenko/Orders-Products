import { NavLink } from "react-router";
import style from "./NavigationMenu.module.css";

export const NavigationMenu = () => {
  return (
    <div className={style.navContainer}>
      <NavLink to="/" className={style.links}>
        Home
      </NavLink>

      <NavLink to="/orders" className={style.links}>
        Orders
      </NavLink>
      <NavLink to="/products" className={style.links}>
        Products
      </NavLink>
    </div>
  );
};
