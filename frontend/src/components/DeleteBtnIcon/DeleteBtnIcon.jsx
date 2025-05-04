import s from "./DeleteBtnIcon.module.css";

export const DeleteBtnIcon = () => {
  return (
    <button className={s.deleteBtn}>
      <svg className={s.deleteBtnIconTrash}>
        <use xlinkHref="/sprite.svg#icon-trash" />
      </svg>
    </button>
  );
};
