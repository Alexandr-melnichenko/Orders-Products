import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import style from "./ProductModal.module.css";
// const BASE_URL = "http://localhost:3000";
const BASE_URL = import.meta.env.VITE_FRONTEND_URL;

export const ProductModal = ({ show, onHide, product = null }) => {
  const ProductDescription = ({ product = null }) => {
    if (!product) return <div>No product selected</div>;
    const renderPrice = (prices, currency, isDefault, styleClass) => {
      if (!prices) return null;
      const price = prices?.find(
        (p) => p.symbol === currency && !!p.is_default === isDefault
      );
      return price ? (
        <p className={`${style.p} ${styleClass}`}>
          {price.value} {price.symbol}
        </p>
      ) : null;
    };

    const formatDate = (dateString) => {
      if (!dateString) return "—";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };

    return (
      <Container className={style.descriptionContainer}>
        <Row className={style.rowStyle}>
          <Col md={4} className={style.label}>
            Serial Number:
          </Col>
          <Col md={8}>{product.serial_number || "—"}</Col>
        </Row>
        <Row className={style.rowStyle}>
          <Col md={4} className={style.label}>
            Created date:
          </Col>
          <Col md={8}>{formatDate(product.date) || "—"}</Col>
        </Row>
        <Row className={style.rowStyle}>
          <Col md={4} className={style.label}>
            Order title:
          </Col>
          <Col md={8}>{product.order_title || "—"}</Col>
        </Row>
        <Row className={style.rowStyle}>
          <Col md={4} className={style.label}>
            Type:
          </Col>
          <Col md={8}>{product.type || "—"}</Col>
        </Row>
        <Row className={style.rowStyle}>
          <Col md={4} className={style.label}>
            Specification:
          </Col>
          <Col md={8}>{product.specification || "—"}</Col>
        </Row>
        <Row className={style.rowStyle}>
          <Col md={4} className={style.label}>
            Status:
          </Col>
          <Col md={8}>{product.is_new ? "New" : "Used"}</Col>
        </Row>
        <Row className={style.rowStyle}>
          <Col md={4} className={style.label}>
            Price UAH:
          </Col>
          <Col md={8}>
            {renderPrice(product.prices, "UAH", false, style.uahPrice)}
          </Col>
        </Row>
        <Row className={style.rowStyle}>
          <Col md={4} className={style.label}>
            Price USD:
          </Col>
          <Col md={8}>
            {renderPrice(product.prices, "USD", true, style.usdPrice)}
          </Col>
        </Row>
        <Row className={style.rowStyle}>
          <Col md={4} className={style.label}>
            Guarantee:
          </Col>
          <Col md={8}>
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
        </Row>
      </Container>
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      dialogClassName={style.customModal}
    >
      <Modal.Header closeButton className={style.modalHeader}>
        <Modal.Title className={style.modalTitle}>
          {product?.title || "No title"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={style.modalBody}>
        <div className={style.productModal_wrapper}>
          {product?.photo_url && ( // Проверка photo_url
            <div className={style.productModal_imgBox}>
              <img
                src={`${BASE_URL}${product.photo_url}`}
                alt={product?.title}
                className={style.enlargedImage}
                style={{
                  maxHeight: "calc(60vh - 40px)",
                }}
              />
            </div>
          )}
          <ProductDescription product={product} />
        </div>
      </Modal.Body>
    </Modal>
  );
};
