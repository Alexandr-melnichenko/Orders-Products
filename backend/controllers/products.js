import pool from "../config/db.js";

export const getAllProducts = async (page = 1, limit = 10, filters = {}) => {
  const offset = (page - 1) * limit;

  try {
    let baseQuery = `
      SELECT 
        p.*,
        g.start_date AS guarantee_start,
        g.end_date AS guarantee_end,
        o.title AS order_title,
        CONCAT('/uploads/products/', p.photo) AS photo_url,
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
    `;

    const whereClauses = [];
    const queryParams = [];

    if (filters.order_id) {
      whereClauses.push("p.order_id = ?");
      queryParams.push(filters.order_id);
    }

    if (filters.type) {
      whereClauses.push("p.type = ?");
      queryParams.push(filters.type);
    }

    const whereQuery =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join("AND")}` : "";

    const paginationQuery = `LIMIT ? OFFSET ?`;
    const fullQuery = baseQuery + whereQuery + paginationQuery;

    queryParams.push(limit, offset);

    const [rows] = await pool.query(fullQuery, queryParams);

    let countQuery = `SELECT COUNT(*) AS count FROM products p ${whereQuery}`;

    const [[{ count }]] = await pool.query(
      countQuery,
      queryParams.slice(0, -2)
    );

    const products = rows.map((product) => {
      // Безопасный парсинг JSON для prices
      let pricesParsed = [];
      try {
        pricesParsed = product.prices
          ? typeof product.prices === "string"
            ? JSON.parse(product.prices)
            : product.prices
          : [];
      } catch (e) {
        console.error("Price parsing error:", e);
      }

      return {
        ...product,
        prices: pricesParsed,
        guarantee: product.guarantee_start
          ? {
              start: product.guarantee_start,
              end: product.guarantee_end,
            }
          : null,
        order: product.order_title ? { title: product.order_title } : null,
      };
    });

    return {
      success: true,
      products,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalProducts: count,
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch products");
  }
};

export const getProductDetails = async (productId) => {
  const [product] = await pool.query(
    `
    SELECT 
      p.*,
      g.start_date AS guarantee_start,
      g.end_date AS guarantee_end,
      o.title AS order_title,
      CONCAT('/uploads/products/', p.photo) AS photo_url,
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
