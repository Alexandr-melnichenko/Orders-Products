import express from "express";
import { getAllOrders, getOrderWithProducts } from "../controllers/orders.js";
import { getAllProducts, getProductDetails } from "../controllers/products.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/orders", async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/orders-with-stats", async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const query = `
    SELECT 
      o.id,
      o.title,
      o.date,
      o.description,
      (
    SELECT CAST(COUNT(*) AS CHAR) 
    FROM products p 
    WHERE p.order_id = o.id
  ) AS products_count,
      COALESCE(SUM(CASE WHEN pr.symbol = 'USD' AND pr.is_default = 1 THEN pr.value ELSE 0 END), 0) AS products_summ_USD,
      COALESCE(SUM(CASE WHEN pr.symbol = 'UAH' AND pr.is_default = 0 THEN pr.value ELSE 0 END), 0) AS products_summ_UAH
    FROM 
      orders o
    LEFT JOIN 
      products p ON p.order_id = o.id
    LEFT JOIN 
      prices pr ON pr.product_id = p.id
    GROUP BY 
      o.id, o.title, o.date, o.description
    ORDER BY 
      o.id
  `;

    const [rows] = await connection.query(query);
    connection.release();

    const formattedRows = rows.map((row) => ({
      ...row,
      date: new Date(row.date).toISOString(),
    }));

    res.json(formattedRows);
  } catch (error) {
    console.error("Error fetching orders with stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/types", async (req, res) => {
  try {
    const [types] = await pool.query(
      "SELECT DISTINCT type FROM products WHERE type IS NOT NULL ORDER BY type"
    );
    res.json(types.map((item) => item.type));
  } catch (error) {
    console.error("Error fetching product types:", error);
    res.status(500).json({ error: "Failed to fetch product types" });
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
    const limit = parseInt(req.query.limit) || 10;

    const filters = {
      order_id: req.query.order_id,
      type: req.query.type,
    };

    const result = await getAllProducts(page, limit, filters);
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

router.get("/test", (req, res) => {
  console.log("Тестовий запит отримано!");
  res.json({
    message: "API працює!",
    timestamp: new Date().toISOString(),
  });
});

// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK" });
// });

export default router;
