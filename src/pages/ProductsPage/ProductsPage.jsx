import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";
import { Products } from "../../components/Products/Products";
import { TopMenu } from "../../components/TopMenu/TopMenu";

export const ProductsPage = () => {
  return (
    <>
      <TopMenu />
      <NavigationMenu />
      <Products />
    </>
  );
};
