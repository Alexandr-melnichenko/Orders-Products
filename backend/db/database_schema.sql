CREATE DATABASE IF NOT EXISTS test_task_db;
USE test_task_db;

-- Таблица ордеров
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    description TEXT
) ENGINE=InnoDB;

-- Таблица продуктов
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    serial_number INT NOT NULL,
    is_new BOOLEAN NOT NULL,
    photo VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    specification TEXT,
    order_id INT,
    date DATETIME NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Таблица гарантий
CREATE TABLE guarantees (
    product_id INT PRIMARY KEY,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Таблица цен
CREATE TABLE prices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    symbol VARCHAR(3) NOT NULL,
    is_default BOOLEAN NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Тестовые данные
INSERT INTO orders (id, title, date, description) VALUES
(1, 'Order 1', '2025-03-26 10:05:00', 'two notebooks' ),
(2, 'Order 2', '2025-03-27 15:17:10', 'three phones' ),
(3, 'Order 3', '2025-03-28 11:22:24', 'one TV' ),
(4, 'Order 4', '2025-03-29 14:00:56', 'five earphones, two sunglasses' );


-- Товары для Order 1 (two notebooks)
INSERT INTO products (id, serial_number, is_new, photo, title, type, specification, order_id, date) VALUES
(1, 100001, 1, 'MacBook-Pro-14.jpg', 'MacBook Pro 14"', 'Laptops', 'M3 Pro, 16GB, 512GB', 1, '2025-03-26 10:05:00'),
(2, 100002, 1, 'Dell-XPS-15.jpg', 'Dell XPS 15', 'Laptops', 'i7, 32GB, 1TB SSD', 1, '2025-03-26 10:05:00');

-- Товары для Order 2 (three phones)
INSERT INTO products (id, serial_number, is_new, photo, title, type, specification, order_id, date) VALUES
(3, 200001, 1, 'iPhone-16-Pro.jpg', 'iPhone 16 Pro', 'Phones', '6.1", A18, 256GB', 2, '2025-03-27 15:17:10'),
(4, 200002, 0, 'Samsung-Galaxy-S25.jpg', 'Samsung Galaxy S25', 'Phones', '6.5", Snapdragon 8 Gen 4', 2, '2025-03-27 15:17:10'),
(5, 200003, 1, 'Google-Pixel-9.jpg', 'Google Pixel 9', 'Phones', '6.3", Tensor G4', 2, '2025-03-27 15:17:10');

-- Товары для Order 3 (one TV)
INSERT INTO products (id, serial_number, is_new, photo, title, type, specification, order_id, date) VALUES
(6, 300001, 1, 'LG-OLED-C4.jpg', 'LG OLED C4', 'TVs', '65", 4K, 120Hz', 3, '2025-03-28 11:22:24');

-- Товары для Order 4 (five earphones, two sunglasses)
INSERT INTO products (id, serial_number, is_new, photo, title, type, specification, order_id, date) VALUES
(7, 400001, 1, 'AirPods-Pro-3.jpg', 'AirPods Pro 3', 'Earphones', 'ANC, USB-C', 4, '2025-03-29 14:00:56'),
(8, 400002, 1, 'Sony-WF-1000XM5.jpg', 'Sony WF-1000XM5', 'Earphones', 'ANC, 30h battery', 4, '2025-03-29 14:00:56'),
(9, 400003, 0, 'Bose-QuietComfort.jpg', 'Bose QuietComfort', 'Earphones', 'ANC, IPX4', 4, '2025-03-29 14:00:56'),
(10, 400004, 1, 'Samsung-Buds3-Pro.jpg', 'Samsung Buds3 Pro', 'Earphones', 'ANC, 24-bit audio', 4, '2025-03-29 14:00:56'),
(11, 400005, 1, 'Jabra-Elite-8.jpg', 'Jabra Elite 8', 'Earphones', 'ANC, rugged', 4, '2025-03-29 14:00:56'),
(12, 400006, 1, 'Ray-Ban-Meta.jpg', 'Ray-Ban Meta', 'Sunglasses', 'Smart glasses, camera', 4, '2025-03-29 14:00:56'),
(13, 400007, 1, 'Oakley-Holbrook.jpg', 'Oakley Holbrook', 'Sunglasses', 'Polarized, UV400', 4, '2025-03-29 14:00:56');

-- Добавляем гарантии для всех товаров
INSERT INTO guarantees (product_id, start_date, end_date) VALUES
(1, '2025-03-26', '2026-03-26'),
(2, '2025-03-26', '2026-03-26'),
(3, '2025-03-27', '2026-03-27'),
(4, '2025-03-27', '2026-03-27'),
(5, '2025-03-27', '2026-03-27'),
(6, '2025-03-28', '2027-03-28'),
(7, '2025-03-29', '2026-03-29'),
(8, '2025-03-29', '2026-03-29'),
(9, '2025-03-29', '2026-03-29'),
(10, '2025-03-29', '2026-03-29'),
(11, '2025-03-29', '2026-03-29'),
(12, '2025-03-29', '2026-03-29'),
(13, '2025-03-29', '2026-03-29');

-- Добавляем цены для всех товаров
INSERT INTO prices (product_id, value, symbol, is_default) VALUES
-- MacBook Pro 14"
(1, 1999.00, 'USD', 1),
(1, 72900.00, 'UAH', 0),
-- Dell XPS 15
(2, 1799.00, 'USD', 1),
(2, 65900.00, 'UAH', 0),
-- iPhone 16 Pro
(3, 999.00, 'USD', 1),
(3, 36900.00, 'UAH', 0),
-- Samsung Galaxy S25
(4, 899.00, 'USD', 1),
(4, 32900.00, 'UAH', 0),
-- Google Pixel 9
(5, 799.00, 'USD', 1),
(5, 29900.00, 'UAH', 0),
-- LG OLED C4
(6, 2499.00, 'USD', 1),
(6, 89900.00, 'UAH', 0),
-- AirPods Pro 3
(7, 249.00, 'USD', 1),
(7, 8990.00, 'UAH', 0),
-- Sony WF-1000XM5
(8, 299.00, 'USD', 1),
(8, 10990.00, 'UAH', 0),
-- Bose QuietComfort
(9, 279.00, 'USD', 1),
(9, 9990.00, 'UAH', 0),
-- Samsung Buds3 Pro
(10, 229.00, 'USD', 1),
(10, 8290.00, 'UAH', 0),
-- Jabra Elite 8
(11, 199.00, 'USD', 1),
(11, 7490.00, 'UAH', 0),
-- Ray-Ban Meta
(12, 299.00, 'USD', 1),
(12, 10990.00, 'UAH', 0),
-- Oakley Holbrook
(13, 159.00, 'USD', 1),
(13, 5790.00, 'UAH', 0);
