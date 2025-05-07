import style from "./Hero.module.css";

export const Hero = () => {
  return (
    <div className={style.heroWrapper}>
      <h1 className={style.heroTitle}>INVENTORY</h1>
      <h2 className={style.heroOffer}>Try our warehouse management system! </h2>
    </div>
  );
};
