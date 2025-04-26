import style from "./TopMenu.module.css";

export const TopMenu = () => {
  return (
    <div className={style.menuContainer}>
      <p>Logotype</p>
      <p>SearchBar</p>
      <p>Date</p>
    </div>
  );
};
