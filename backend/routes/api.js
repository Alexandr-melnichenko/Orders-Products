import express from "express";
import { getAllOrders, getOrderWithProducts } from "../controllers/orders.js";
import { getAllProducts, getProductDetails } from "../controllers/products.js";

const router = express.Router();

router.get("/orders", async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const order = await getOrderWithProducts(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const result = await getAllProducts(page);
    res.json(result);
  } catch (error) {
    // Логируем полную ошибку для дебага
    console.error("Products list error:", error);

    // Клиенту отправляем укороченную версию
    res.status(500).json({
      error: "Internal server error",
      message: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await getProductDetails(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
        id: req.params.id,
      });
    }

    // ВАЖНО: Преобразуем NULL-значения для фронтенда
    const response = {
      ...product,
      prices: product.prices || [], // Если prices был NULL
    };

    res.json(response);
  } catch (error) {
    console.error("Product details error:", error);
    res.status(500).json({
      error: "Failed to get product details",
      id: req.params.id,
    });
  }
});

export default router;
