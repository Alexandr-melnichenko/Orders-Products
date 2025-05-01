import { Products } from "../../components/Products/Products";
import { Orders } from "../../components/Orders/Orders";
import style from "./GroupPage.module.css";
import { TopMenu } from "../../components/TopMenu/TopMenu";
import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";

export const GroupPage = () => {
  return (
    <div>
      <TopMenu />

      <div className={style.groupsPageContainer}>
        <NavigationMenu />
        <Orders />
        {/* <Products /> */}
      </div>
    </div>
  );
};
