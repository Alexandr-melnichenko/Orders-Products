import style from "./CloseBtnCircle.module.css";

export const CloseBtnCircle = () => {
  return (
    <div className={style.closeBtn}>
      <svg className={style.closeBtn__icon}>
        <use xlinkHref="/sprite.svg#icon-close-x" />
      </svg>
    </div>
  );
};
