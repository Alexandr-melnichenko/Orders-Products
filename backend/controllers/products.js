import pool from "../config/db.js";

export const getAllProducts = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const [rows] = await pool.query("SELECT * FROM products LIMIT ? OFFSET ?", [
    limit,
    offset,
  ]);
  return rows;
};

export const getProductDetails = async (productId) => {
  const [product] = await pool.query(
    `
    SELECT p.*, 
      JSON_OBJECT('start', g.start_date, 'end', g.end_date) as guarantee,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'value', pr.value,
            'symbol', pr.symbol,
            'isDefault', pr.is_default
          )
        )
        FROM prices pr WHERE pr.product_id = p.id
      ) as prices
    FROM products p
    LEFT JOIN guarantees g ON g.product_id = p.id
    WHERE p.id = ?
  `,
    [productId]
  );

  return product[0];
};
