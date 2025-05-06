import { Orders } from "../../components/Orders/Orders";
import style from "./GroupPage.module.css";
import { TopMenu } from "../../components/TopMenu/TopMenu";
import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveOrder,
  selectProductsOfOrder,
} from "../../redux/selectors";
import { CloseBtnCircle } from "../../components/CloseBtnCircle/CloseBtnCircle";
import { DeleteBtnIcon } from "../../components/DeleteBtnIcon/DeleteBtnIcon";
import { resetProductsOfOrder } from "../../redux/slices/productSlice";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
const BASE_URL = "http://localhost:3000";

export const GroupPage = () => {
  const dispatch = useDispatch();
  const productsOfOrder = useSelector(selectProductsOfOrder);
  const activeOrder = useSelector(selectActiveOrder);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    console.log("Products of order:", productsOfOrder);
  }, [productsOfOrder]);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      // dispatch(deleteProduct(selectedProduct.id));
      console.log("Удаляем товар:", selectedProduct.id);
    }
    setShowModal(false);
  };

  const productsOfOrderList = productsOfOrder.map((product) => {
    return (
      <li key={product.id} className={style.productsList__productBox}>
        <div className={style.productsList__productBoxImgContainer}>
          <img
            src={`${BASE_URL}${product.photo_url}`}
            alt={product.title}
            className={style.productImage}
          />
        </div>

        <div className={style.productsList__productBoxTitleWrap}>
          <p className={`${style.p} ${style.productTitle}`}>{product.title}</p>
          <p className={`${style.p} ${style.smallGrayText}`}>
            S/N: {product.serial_number}
          </p>
        </div>

        <p className={style.p}>{product.is_new ? "New" : "Used"}</p>
        {product.prices && product.prices.length > 0 && (
          <p className={`${style.p} ${style.productTitle}`}>
            {product.prices[0].value} {product.prices[0].symbol}
          </p>
        )}

        <DeleteBtnIcon
          variant="danger"
          onClick={() => handleDeleteClick(product)}
        />
      </li>
    );
  });

  const handleCloseBtn = (event) => {
    event.stopPropagation();
    dispatch(resetProductsOfOrder());
    console.log("products after clsBtn:", productsOfOrder);
  };

  return (
    <div>
      <TopMenu />

      <div className={style.groupsPageContainer}>
        <NavigationMenu />
        <div className={style.sectionWrapper}>
          <Orders />
          {productsOfOrder.length > 0 && (
            <div className={style.productsList}>
              <CloseBtnCircle
                onClick={handleCloseBtn}
                className={style.productsList_closeBtn}
              />
              <h2 className={style.productsList__title}>{activeOrder}</h2>
              <button className={style.productsList__btnAddProduct}>
                <div className={style.productsList__btnAddProductIconWrap}>
                  <svg className={style.productsList__btnAddProductIcon}>
                    <use xlinkHref="/sprite.svg#icon-plus" />
                  </svg>
                </div>
                <p>Add product</p>
              </button>
              <ul className={style.ulProductsWrapper}>{productsOfOrderList}</ul>
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        bodyText={
          selectedProduct &&
          `Вы уверены, что хотите удалить товар "${selectedProduct.title}"?`
        }
      />
    </div>
  );
};
