import style from "./Products.module.css";
import { useEffect, useState } from "react";
import { selectProducts } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductTypes } from "../../redux/operations";
import Pagination from "react-bootstrap/Pagination";
import { DeleteBtnIcon } from "../DeleteBtnIcon/DeleteBtnIcon";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { CenteredCubeLoader } from "../CubeLoader/CubeLoader";
import { ProductFilter } from "../ProductFilter/ProductFilter";

const BASE_URL = "http://localhost:3000";

export const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  const { totalPages, types, loading, error, typesLoading, typesError } =
    useSelector((state) => state.products);

  const products = useSelector(selectProducts);
  console.log("Products:", products);

  useEffect(() => {
    dispatch(fetchProductTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        type: selectedType,
      })
    );
    console.log("products.data:", products);
  }, [dispatch, currentPage, selectedType]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  if (typesLoading)
    return (
      <div>
        <CenteredCubeLoader />
      </div>
    );
  if (typesError) {
    console.log("Ошибка загрузки Type:", typesError);
    return <div>Error: {typesError}</div>;
  }

  if (loading)
    return (
      <div>
        <CenteredCubeLoader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const GreenCircle = () => <div className={style.greenCircle}></div>;
  const OrangeCircle = () => <div className={style.orangeCircle}></div>;

  const renderPrice = (prices, currency, isDefault, styleClass) => {
    const price = prices?.find(
      (p) => p.symbol === currency && !!p.is_default === isDefault
    );
    return price ? (
      <p className={`${style.p} ${styleClass}`}>
        {price.value} {price.symbol}
      </p>
    ) : null;
  };

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

  function RowProductData({ product }) {
    return (
      <Container>
        <Row className="gx-5 align-items-center">
          <Col xs="auto" className="flex-shrink-0">
            <div className={style.productsList__ItemBoxImgContainer}>
              <img
                src={`${BASE_URL}${product.photo_url}`}
                alt={product.title}
                className={style.productsList__ItemBoxImage}
              />
            </div>
          </Col>
          <Col className="text-truncate">
            <div className={style.productsList__ItemBoxTitleContainer}>
              <p className={`${style.p} ${style.productTitle}`}>
                {product.title}
              </p>
              <p className={`${style.p} ${style.smallGrayText}`}>
                S/N: {product.serial_number}
              </p>
            </div>
          </Col>
          <Col sm="auto" className="min-width-100">
            <div className={style.productsList__ItemBoxTextContainer}>
              <p className={style.p}>{product.type}</p>
              <p className={`${style.p} ${style.smallGrayText}`}>(Type)</p>
            </div>
          </Col>
          <Col className="text-truncate">
            <div className={style.productsList__ItemBoxTextContainer}>
              <p className={style.p}>{product.specification}</p>
              <p className={`${style.p} ${style.smallGrayText}`}>
                (Specification)
              </p>
            </div>
          </Col>
          <Col xs="auto">
            <div className={style.productsList__ItemBoxStatusContainer}>
              {product.is_new ? <GreenCircle /> : <OrangeCircle />}
              <p className={style.p}>{product.is_new ? "New" : "Used"}</p>
            </div>
          </Col>
          <Col xs="auto">
            <div className={style.productsList__ItemBoxTextContainer}>
              {renderPrice(product.prices, "USD", true, style.usdPrice)}
              {renderPrice(product.prices, "UAH", false, style.uahPrice)}
            </div>
          </Col>
          <Col className="min-width-150">
            {product.guarantee && (
              <div className={style.guarantee}>
                <p className={style.p}>
                  <span className={`${style.p} ${style.smallGrayText}`}>
                    from:
                  </span>{" "}
                  {new Date(product.guarantee.start).toLocaleDateString()}
                </p>
                <p className={style.p}>
                  <span className={`${style.p} ${style.smallGrayText}`}>
                    to:&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  </span>
                  {new Date(product.guarantee.end).toLocaleDateString()}
                </p>
              </div>
            )}
          </Col>
          <Col xs="auto">
            {product.order && (
              <div className={style.productsList__ItemBoxTextContainer}>
                <p className={style.p}> {product.order.title}</p>
                <p className={`${style.p} ${style.smallGrayText}`}>
                  Order title
                </p>
              </div>
            )}
          </Col>
          <Col xs="auto">
            <DeleteBtnIcon
              variant="danger"
              onClick={() => handleDeleteClick(product)}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  const productsList = products.map((product) => {
    return (
      <li key={product.id} className={style.productsList__ItemBox}>
        <RowProductData product={product} />
      </li>
    );
  });

  const renderPagination = () => (
    <Pagination size="sm" className="mt-3 mb-4 justify-content-center">
      <Pagination.Prev
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      />

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );

  return (
    <div className={style.productsListContainer}>
      <div className={style.titleContainer}>
        <h2>All Products</h2>
        <ProductFilter types={types} onFilterSubmit={handleTypeChange} />
      </div>

      {renderPagination()}

      <ul className={style.productsList__ulWrapper}>{productsList}</ul>
      {renderPagination()}
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
