import pool from "../config/db.js";

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
