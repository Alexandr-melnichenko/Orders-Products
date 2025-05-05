import { NavLink } from "react-router";
import style from "./Logo.module.css";

export const Logo = () => {
  return (
    <NavLink to="/" className={style.logoWrapper}>
      <img
        src="../../../public/Logo.png"
        alt="Logotype"
        className={style.logoImg}
      />
      {/* <svg className={style.iconLogo}>
        <use xlinkHref="/sprite.svg#icon-Logo"></use>
      </svg> */}
    </NavLink>
  );
};
