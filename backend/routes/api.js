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
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await getProductDetails(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
