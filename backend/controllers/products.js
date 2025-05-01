import pool from "../config/db.js";

export const getAllProducts = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  try {
    const [products] = await pool.query(
      `
      SELECT 
        p.*,
        g.start_date AS guarantee_start,
        g.end_date AS guarantee_end,
        o.title AS order_title,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'value', pr.value,
              'symbol', pr.symbol,
              'is_default', pr.is_default
            )
          )
          FROM prices pr 
          WHERE pr.product_id = p.id
        ) AS prices
      FROM products p
      LEFT JOIN guarantees g ON p.id = g.product_id
      LEFT JOIN orders o ON p.order_id = o.id
      LIMIT ? OFFSET ?
    `,
      [limit, offset]
    );

    const [[{ count }]] = await pool.query(
      "SELECT COUNT(*) AS count FROM products"
    );

    return {
      products: products || [],
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalProducts: count,
    };
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

export const getProductDetails = async (productId) => {
  const [product] = await pool.query(
    `
    SELECT 
      p.*,
      g.start_date AS guarantee_start,
      g.end_date AS guarantee_end,
      /* 
        ВАЖНО: Если order_id NULL - LEFT JOIN вернёт NULL для полей заказа.
        На фронтенде нужно это учитывать.
      */
      o.title AS order_title,
      o.description AS order_description,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'value', pr.value,
            'symbol', pr.symbol,
            'is_default', pr.is_default
          )
        )
        FROM prices pr 
        WHERE pr.product_id = p.id
      ) AS prices
    FROM products p
    LEFT JOIN guarantees g ON p.id = g.product_id
    LEFT JOIN orders o ON p.order_id = o.id
    WHERE p.id = ?
  `,
    [productId]
  );

  return product[0];
};
