import { NavLink } from "react-router";
import style from "./Logo.module.css";
import logo from "../../assets/Logo.png";

export const Logo = () => {
  return (
    <NavLink to="/" className={style.logoWrapper}>
      <img src={logo} alt="Logotype" className={style.logoImg} />
    </NavLink>
  );
};
