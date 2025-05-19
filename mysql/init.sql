USE ShopDB;
-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(255) DEFAULT 'user',
    googleId VARCHAR(255) UNIQUE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS Products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    price FLOAT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS Orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    CustomerID INT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS OrderItems (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quantity INT,
    price FLOAT,
    OrderId INT,
    ProductId VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    UNIQUE KEY OrderItems_ProductId_OrderId_unique (OrderId, ProductId),
    FOREIGN KEY (OrderId) REFERENCES Orders(id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(id)
);
-- Insert 5 sample users
INSERT INTO Users (
        name,
        email,
        password,
        role,
        createdAt,
        updatedAt
    )
VALUES (
        'Admin User',
        'admin@example.com',
        '$2b$10$62Df81B8Zq6ozF4LDsUB4.pv.4qhTBGn.0PVvzPJ82bgQ6n1hUWaC',
        'admin',
        NOW(),
        NOW()
    ),
    (
        'John Doe',
        'john@example.com',
        '$2b$10$TdO.TLRM4cFJyjhL4U3C1e4edQHFia.sgl3yRm8rE5L5yuumLKSze',
        'user',
        NOW(),
        NOW()
    ),
    (
        'Jane Smith',
        'jane@example.com',
        '$2b$10$TdO.TLRM4cFJyjhL4U3C1e4edQHFia.sgl3yRm8rE5L5yuumLKSze',
        'user',
        NOW(),
        NOW()
    ),
    (
        'Emily Johnson',
        'emily@example.com',
        '$2b$10$TdO.TLRM4cFJyjhL4U3C1e4edQHFia.sgl3yRm8rE5L5yuumLKSze',
        'user',
        NOW(),
        NOW()
    ),
    (
        'Michael Brown',
        'michael@example.com',
        '$2b$10$TdO.TLRM4cFJyjhL4U3C1e4edQHFia.sgl3yRm8rE5L5yuumLKSze',
        'user',
        NOW(),
        NOW()
    );
-- Insert 30 sample products
INSERT INTO Products (
        id,
        name,
        description,
        price,
        createdAt,
        updatedAt
    )
VALUES (
        'prod1',
        'Smartphone X',
        'Latest generation smartphone with advanced features',
        899.99,
        NOW(),
        NOW()
    ),
    (
        'prod2',
        'Laptop Pro',
        'High-performance laptop for professionals',
        1299.99,
        NOW(),
        NOW()
    ),
    (
        'prod3',
        'Wireless Headphones',
        'Noise-cancelling wireless headphones',
        199.99,
        NOW(),
        NOW()
    ),
    (
        'prod4',
        'Smart Watch',
        'Fitness and health tracking smart watch',
        249.99,
        NOW(),
        NOW()
    ),
    (
        'prod5',
        'Tablet Ultra',
        '10-inch tablet with high-resolution display',
        499.99,
        NOW(),
        NOW()
    ),
    (
        'prod6',
        'Bluetooth Speaker',
        'Portable bluetooth speaker with rich sound',
        79.99,
        NOW(),
        NOW()
    ),
    (
        'prod7',
        'Digital Camera',
        'Professional digital camera with 4K video',
        799.99,
        NOW(),
        NOW()
    ),
    (
        'prod8',
        'Gaming Console',
        'Next-gen gaming console with 1TB storage',
        499.99,
        NOW(),
        NOW()
    ),
    (
        'prod9',
        'Wireless Earbuds',
        'True wireless earbuds with charging case',
        129.99,
        NOW(),
        NOW()
    ),
    (
        'prod10',
        'Smart TV',
        '55-inch 4K smart TV with HDR',
        699.99,
        NOW(),
        NOW()
    ),
    (
        'prod11',
        'External Hard Drive',
        '2TB portable external hard drive',
        89.99,
        NOW(),
        NOW()
    ),
    (
        'prod12',
        'Wireless Mouse',
        'Ergonomic wireless mouse',
        39.99,
        NOW(),
        NOW()
    ),
    (
        'prod13',
        'Mechanical Keyboard',
        'RGB mechanical gaming keyboard',
        129.99,
        NOW(),
        NOW()
    ),
    (
        'prod14',
        'Monitor Ultra',
        '27-inch 4K monitor with IPS panel',
        349.99,
        NOW(),
        NOW()
    ),
    (
        'prod15',
        'Wireless Charger',
        'Fast wireless charging pad',
        29.99,
        NOW(),
        NOW()
    ),
    (
        'prod16',
        'VR Headset',
        'Virtual reality headset with controllers',
        399.99,
        NOW(),
        NOW()
    ),
    (
        'prod17',
        'Smart Speaker',
        'Voice-controlled smart speaker',
        99.99,
        NOW(),
        NOW()
    ),
    (
        'prod18',
        'Fitness Tracker',
        'Water-resistant fitness tracker',
        79.99,
        NOW(),
        NOW()
    ),
    (
        'prod19',
        'Drone Pro',
        'Professional drone with 4K camera',
        899.99,
        NOW(),
        NOW()
    ),
    (
        'prod20',
        'Portable Power Bank',
        '20000mAh portable power bank',
        49.99,
        NOW(),
        NOW()
    ),
    (
        'prod21',
        'USB-C Hub',
        'Multi-port USB-C hub adapter',
        59.99,
        NOW(),
        NOW()
    ),
    (
        'prod22',
        'Graphic Tablet',
        'Digital drawing tablet for artists',
        249.99,
        NOW(),
        NOW()
    ),
    (
        'prod23',
        'WiFi Router',
        'Dual-band WiFi 6 router',
        149.99,
        NOW(),
        NOW()
    ),
    (
        'prod24',
        'Laser Printer',
        'Color laser printer for home office',
        299.99,
        NOW(),
        NOW()
    ),
    (
        'prod25',
        'Portable SSD',
        '1TB portable solid state drive',
        169.99,
        NOW(),
        NOW()
    ),
    (
        'prod26',
        'Gaming Mouse',
        'High-precision gaming mouse',
        69.99,
        NOW(),
        NOW()
    ),
    (
        'prod27',
        'Webcam HD',
        'Full HD webcam with microphone',
        79.99,
        NOW(),
        NOW()
    ),
    (
        'prod28',
        'Microphone Pro',
        'Professional USB condenser microphone',
        149.99,
        NOW(),
        NOW()
    ),
    (
        'prod29',
        'Electric Toothbrush',
        'Smart electric toothbrush',
        89.99,
        NOW(),
        NOW()
    ),
    (
        'prod30',
        'Air Purifier',
        'HEPA air purifier for home',
        199.99,
        NOW(),
        NOW()
    );
-- Insert 30 sample orders
INSERT INTO Orders (date, CustomerID, createdAt, updatedAt)
VALUES (NOW(), 2, NOW(), NOW()),
    (NOW(), 3, NOW(), NOW()),
    (NOW(), 4, NOW(), NOW()),
    (NOW(), 5, NOW(), NOW()),
    (NOW(), 2, NOW(), NOW()),
    (NOW(), 3, NOW(), NOW()),
    (NOW(), 4, NOW(), NOW()),
    (NOW(), 5, NOW(), NOW()),
    (NOW(), 2, NOW(), NOW()),
    (NOW(), 3, NOW(), NOW()),
    (NOW(), 4, NOW(), NOW()),
    (NOW(), 5, NOW(), NOW()),
    (NOW(), 2, NOW(), NOW()),
    (NOW(), 3, NOW(), NOW()),
    (NOW(), 4, NOW(), NOW()),
    (NOW(), 5, NOW(), NOW()),
    (NOW(), 2, NOW(), NOW()),
    (NOW(), 3, NOW(), NOW()),
    (NOW(), 4, NOW(), NOW()),
    (NOW(), 5, NOW(), NOW()),
    (NOW(), 2, NOW(), NOW()),
    (NOW(), 3, NOW(), NOW()),
    (NOW(), 4, NOW(), NOW()),
    (NOW(), 5, NOW(), NOW()),
    (NOW(), 2, NOW(), NOW()),
    (NOW(), 3, NOW(), NOW()),
    (NOW(), 4, NOW(), NOW()),
    (NOW(), 5, NOW(), NOW()),
    (NOW(), 2, NOW(), NOW()),
    (NOW(), 3, NOW(), NOW());
-- Insert order items
INSERT INTO OrderItems (
        OrderId,
        ProductId,
        quantity,
        price,
        createdAt,
        updatedAt
    )
VALUES (1, 'prod1', 1, 899.99, NOW(), NOW()),
    (1, 'prod3', 1, 199.99, NOW(), NOW()),
    (2, 'prod2', 1, 1299.99, NOW(), NOW()),
    (2, 'prod15', 2, 29.99, NOW(), NOW()),
    (3, 'prod5', 1, 499.99, NOW(), NOW()),
    (3, 'prod9', 1, 129.99, NOW(), NOW()),
    (4, 'prod4', 1, 249.99, NOW(), NOW()),
    (4, 'prod20', 1, 49.99, NOW(), NOW()),
    (5, 'prod7', 1, 799.99, NOW(), NOW()),
    (6, 'prod10', 1, 699.99, NOW(), NOW()),
    (7, 'prod6', 2, 79.99, NOW(), NOW()),
    (8, 'prod8', 1, 499.99, NOW(), NOW()),
    (9, 'prod12', 3, 39.99, NOW(), NOW()),
    (10, 'prod11', 1, 89.99, NOW(), NOW()),
    (10, 'prod15', 1, 29.99, NOW(), NOW()),
    (11, 'prod14', 1, 349.99, NOW(), NOW()),
    (12, 'prod13', 1, 129.99, NOW(), NOW()),
    (13, 'prod16', 1, 399.99, NOW(), NOW()),
    (14, 'prod17', 2, 99.99, NOW(), NOW()),
    (15, 'prod18', 1, 79.99, NOW(), NOW()),
    (15, 'prod20', 1, 49.99, NOW(), NOW()),
    (16, 'prod19', 1, 899.99, NOW(), NOW()),
    (17, 'prod21', 1, 59.99, NOW(), NOW()),
    (18, 'prod22', 1, 249.99, NOW(), NOW()),
    (19, 'prod24', 1, 299.99, NOW(), NOW()),
    (20, 'prod23', 1, 149.99, NOW(), NOW()),
    (21, 'prod25', 1, 169.99, NOW(), NOW()),
    (21, 'prod26', 1, 69.99, NOW(), NOW()),
    (22, 'prod27', 1, 79.99, NOW(), NOW()),
    (23, 'prod28', 1, 149.99, NOW(), NOW()),
    (24, 'prod29', 2, 89.99, NOW(), NOW()),
    (25, 'prod30', 1, 199.99, NOW(), NOW()),
    (26, 'prod1', 1, 899.99, NOW(), NOW()),
    (27, 'prod3', 2, 199.99, NOW(), NOW()),
    (28, 'prod5', 1, 499.99, NOW(), NOW()),
    (29, 'prod7', 1, 799.99, NOW(), NOW()),
    (30, 'prod9', 3, 129.99, NOW(), NOW());