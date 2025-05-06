import s from "./DeleteBtnIcon.module.css";

export const DeleteBtnIcon = ({ variant, onClick }) => {
  return (
    <button
      variant={variant}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={s.deleteBtn}
    >
      <svg className={s.deleteBtnIconTrash}>
        <use xlinkHref="/sprite.svg#icon-trash" />
      </svg>
    </button>
  );
};
