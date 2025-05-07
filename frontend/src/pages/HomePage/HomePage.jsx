import { Hero } from "../../components/Hero/Hero";
import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";
import { TopMenu } from "../../components/TopMenu/TopMenu";
import style from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <>
      <TopMenu />
      <div className={style.homePageWrapper}>
        <NavigationMenu />
        <Hero />
      </div>
    </>
  );
};
