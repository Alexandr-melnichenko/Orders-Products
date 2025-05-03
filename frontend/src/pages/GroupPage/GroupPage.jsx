import { Products } from "../../components/Products/Products";
import { Orders } from "../../components/Orders/Orders";
import style from "./GroupPage.module.css";
import { TopMenu } from "../../components/TopMenu/TopMenu";
import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveOrder,
  selectProductsOfOrder,
} from "../../redux/selectors";
import { CloseBtnCircle } from "../../components/CloseBtnCircle/CloseBtnCircle";
const BASE_URL = "http://localhost:3000";

export const GroupPage = () => {
  // const dispatch = useDispatch();
  const productsOfOrder = useSelector(selectProductsOfOrder);
  const activeOrder = useSelector(selectActiveOrder);

  useEffect(() => {
    console.log("Products of order:", productsOfOrder);
  }, [productsOfOrder]);

  const productsOfOrderList = productsOfOrder.map((product) => {
    return (
      <li key={product.id} className={style.productBox}>
        <p>{product.title}</p>
        <div className={style.imgContainer}>
          <img
            src={`${BASE_URL}${product.photo_url}`}
            alt={product.title}
            className={style.productImage}
          />
        </div>
        <p>Serial: {product.serial_number}</p>
        <p>Type: {product.type}</p>
        <p>{product.specification}</p>
        <p>Status: {product.is_new ? "New" : "Used"}</p>
        {product.prices && product.prices.length > 0 && (
          <p className="price">
            Price: {product.prices[0].value} {product.prices[0].symbol}
          </p>
        )}
        {product.guarantee && (
          <div className={style.guarantee}>
            <p>Warranty:</p>
            <p>
              From: {new Date(product.guarantee.start).toLocaleDateString()}
            </p>
            <p>To: {new Date(product.guarantee.end).toLocaleDateString()}</p>
          </div>
        )}

        {product.order && (
          <p className={style.orderInfo}>
            Order: #{product.order.id} - {product.order.title}
          </p>
        )}
      </li>
    );
  });

  return (
    <div>
      <TopMenu />

      <div className={style.groupsPageContainer}>
        <NavigationMenu />
        <div className={style.sectionWrapper}>
          <Orders />
          {productsOfOrder.length > 0 && (
            <div className={style.productsList}>
              <CloseBtnCircle className={style.productsList_closeBtn} />
              <h2 className={style.productsList__title}>{activeOrder}</h2>
              <button className={style.productsList__btnAddProduct}>
                <div className={style.productsList__btnAddProductIconWrap}>
                  <svg className={style.productsList__btnAddProductIcon}>
                    <use xlinkHref="/sprite.svg#icon-trash" />
                  </svg>
                </div>
                <p>Add product</p>
              </button>
              <ul className={style.ulProductsWrapper}>{productsOfOrderList}</ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
