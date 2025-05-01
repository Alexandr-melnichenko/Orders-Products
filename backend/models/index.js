// import { Sequelize, DataTypes } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// // Настройка подключения
// const sequelize = new Sequelize(
//   process.env.DB_NAME || "test_task_db",
//   process.env.DB_USER || "root",
//   process.env.DB_PASSWORD || "",
//   {
//     host: process.env.DB_HOST || "localhost",
//     dialect: "mysql",
//   }
// );

// // Определение модели Order
// const Order = sequelize.define(
//   "Order",
//   {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//     },
//   },
//   {
//     tableName: "orders", // явно указываем имя таблицы
//     timestamps: false, // отключаем автоматические timestamp'ы
//   }
// );

// // Определение модели Product
// const Product = sequelize.define(
//   "Product",
//   {
//     serial_number: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     is_new: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     photo: {
//       type: DataTypes.STRING,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     type: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     specification: {
//       type: DataTypes.TEXT,
//     },
//     date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "products",
//     timestamps: false,
//   }
// );

// // Определение модели Guarantee
// const Guarantee = sequelize.define(
//   "Guarantee",
//   {
//     product_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//     },
//     start_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     end_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "guarantees",
//     timestamps: false,
//   }
// );

// // Определение модели Price
// const Price = sequelize.define(
//   "Price",
//   {
//     value: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },
//     symbol: {
//       type: DataTypes.STRING(3),
//       allowNull: false,
//     },
//     is_default: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "prices",
//     timestamps: false,
//   }
// );

// // Установка связей между моделями
// Order.hasMany(Product, { foreignKey: "order_id" });
// Product.belongsTo(Order, { foreignKey: "order_id" });

// Product.hasOne(Guarantee, { foreignKey: "product_id", onDelete: "CASCADE" });
// Guarantee.belongsTo(Product, { foreignKey: "product_id" });

// Product.hasMany(Price, { foreignKey: "product_id" });
// Price.belongsTo(Product, { foreignKey: "product_id" });

// // Проверка подключения и синхронизация
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");

//     // Синхронизация моделей с базой данных
//     await sequelize.sync(); // alter: true - безопасное обновление структуры
//     console.log("All models were synchronized successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();

// export { sequelize, Order, Product, Guarantee, Price };
