import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";
import { Products } from "../../components/Products/Products";
import { TopMenu } from "../../components/TopMenu/TopMenu";
import style from "./ProductsPage.module.css";

export const ProductsPage = () => {
  return (
    <>
      <TopMenu />
      <div className={style.productsPageContainer}>
        <NavigationMenu />
        <Products />
      </div>
    </>
  );
};
