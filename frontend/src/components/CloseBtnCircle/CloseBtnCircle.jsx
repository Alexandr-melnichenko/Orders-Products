import style from "./CloseBtnCircle.module.css";

export const CloseBtnCircle = ({ onClick }) => {
  return (
    <div
      className={style.closeBtn}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <svg className={style.closeBtn__icon}>
        <use xlinkHref="/sprite.svg#icon-close-x" />
      </svg>
    </div>
  );
};
