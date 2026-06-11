-- Randomized seed data for the bally schema (PostgreSQL)
-- Run this after DDL.sql

BEGIN;

-- Clear data in child-to-parent order to keep reruns simple.
TRUNCATE TABLE bally.order_items CASCADE;
TRUNCATE TABLE bally.orders CASCADE;
TRUNCATE TABLE bally.user_address CASCADE;
TRUNCATE TABLE bally.address CASCADE;
TRUNCATE TABLE bally.country CASCADE;
TRUNCATE TABLE bally.cart_items CASCADE;
TRUNCATE TABLE bally.carts CASCADE;
TRUNCATE TABLE bally.product_category_link CASCADE;
TRUNCATE TABLE bally.product CASCADE;
TRUNCATE TABLE bally.product_category CASCADE;
TRUNCATE TABLE bally.refresh_tokens CASCADE;
TRUNCATE TABLE bally.users CASCADE;

-- COUNTRIES
INSERT INTO bally.country (country_name)
SELECT c
FROM unnest(ARRAY[
    'Israel',
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Singapore',
]) AS c;

-- USERS
INSERT INTO bally.users (email, password_hash, full_name, role, auth_provider, provider_id)
SELECT
    'user' || g.i || '@example.com' AS email,
    encode(gen_random_bytes(32), 'hex') AS password_hash,
    (ARRAY[
        'Alex Carter',
        'Mia Turner',
        'Liam Brooks',
        'Emma Hayes',
        'Noah Bennett',
        'Olivia Clark',
        'Ethan Reed',
        'Ava Foster',
        'Lucas Ward',
        'Sofia Price'
    ])[1 + floor(random() * 10)::int] AS full_name,
    CASE WHEN random() < 0.10 THEN 'admin'::bally.user_role ELSE 'customer'::bally.user_role END AS role,
    CASE WHEN random() < 0.20 THEN 'google'::bally.auth_provider ELSE 'local'::bally.auth_provider END AS auth_provider,
    CASE WHEN random() < 0.20 THEN 'google_' || g.i ELSE NULL END AS provider_id
FROM generate_series(1, 40) AS g(i);

-- REFRESH TOKENS
INSERT INTO bally.refresh_tokens (user_id, token_hash, revoked)
SELECT
    u.id,
    encode(gen_random_bytes(48), 'hex') AS token_hash,
    random() < 0.10 AS revoked
FROM bally.users u
JOIN LATERAL generate_series(1, (1 + floor(random() * 2))::int) AS gs(n) ON true;

-- PRODUCT CATEGORIES (with simple hierarchy)
INSERT INTO bally.product_category (category_name, parent_category_id)
VALUES
    ('Electronics', NULL),
    ('Fashion', NULL),
    ('Home', NULL),
    ('Sports', NULL);

INSERT INTO bally.product_category (category_name, parent_category_id)
VALUES
    ('Phones', (SELECT id FROM bally.product_category WHERE category_name = 'Electronics' LIMIT 1)),
    ('Laptops', (SELECT id FROM bally.product_category WHERE category_name = 'Electronics' LIMIT 1)),
    ('Mens Wear', (SELECT id FROM bally.product_category WHERE category_name = 'Fashion' LIMIT 1)),
    ('Womens Wear', (SELECT id FROM bally.product_category WHERE category_name = 'Fashion' LIMIT 1));

-- PRODUCTS
INSERT INTO bally.product (name, description, product_image, qty_in_stock, price)
SELECT
    (ARRAY[
        'Trail Sneakers',
        'Urban Backpack',
        'Wireless Earbuds',
        'Smart Watch',
        'Yoga Mat',
        'Desk Lamp',
        'Coffee Grinder',
        'Gaming Mouse',
        'Denim Jacket',
        'Running Shorts'
    ])[1 + floor(random() * 10)::int] || ' ' || g.i AS name,
    'Sample product description ' || g.i AS description,
    'https://picsum.photos/seed/product' || g.i || '/600/600' AS product_image,
    (5 + floor(random() * 200))::int AS qty_in_stock,
    round((10 + random() * 490)::numeric, 2) AS price
FROM generate_series(1, 80) AS g(i);

-- PRODUCT-CATEGORY LINKS (1-2 categories per product)
INSERT INTO bally.product_category_link (product_id, product_category_id)
SELECT
    p.id,
    c.id
FROM bally.product p
JOIN LATERAL (
    SELECT id
    FROM bally.product_category
    ORDER BY random()
    LIMIT (1 + floor(random() * 2))::int
) c ON true
ON CONFLICT DO NOTHING;

-- CARTS (one per customer)
INSERT INTO bally.carts (user_id)
SELECT u.id
FROM bally.users u
WHERE u.role = 'customer';

-- CART ITEMS (1-5 random items per cart)
INSERT INTO bally.cart_items (cart_id, product_id, quantity)
SELECT
    c.id,
    p.id,
    (1 + floor(random() * 4))::int AS quantity
FROM bally.carts c
JOIN LATERAL (
    SELECT id
    FROM bally.product
    ORDER BY random()
    LIMIT (1 + floor(random() * 5))::int
) p ON true
ON CONFLICT (cart_id, product_id) DO UPDATE
SET quantity = EXCLUDED.quantity;

-- ADDRESSES (at least one address per customer)
INSERT INTO bally.address (
    unit_number,
    street_number,
    address_line1,
    address_line2,
    city,
    region,
    postal_code,
    country_id
)
SELECT
    CASE WHEN random() < 0.35 THEN (1 + floor(random() * 25))::int::text ELSE NULL END AS unit_number,
    (10 + floor(random() * 990))::int::text AS street_number,
    'Street ' || left(u.id::text, 8) AS address_line1,
    CASE WHEN random() < 0.25 THEN 'Building ' || (1 + floor(random() * 15))::int::text ELSE NULL END AS address_line2,
    (ARRAY['New York', 'Toronto', 'London', 'Sydney', 'Berlin', 'Paris', 'Tokyo', 'Singapore'])[1 + floor(random() * 8)::int] AS city,
    (ARRAY['NY', 'ON', 'ENG', 'NSW', 'BE', 'IDF', 'Kanto', 'SG'])[1 + floor(random() * 8)::int] AS region,
    lpad((10000 + floor(random() * 89999))::int::text, 5, '0') AS postal_code,
    (SELECT id FROM bally.country ORDER BY random() LIMIT 1) AS country_id
FROM bally.users u
WHERE u.role = 'customer';

-- USER-ADDRESS LINKS (set inserted address as default)
INSERT INTO bally.user_address (user_id, address_id, is_default)
SELECT
    u.id,
    a.id,
    true AS is_default
FROM bally.users u
JOIN bally.address a
    ON a.address_line1 = 'Street ' || left(u.id::text, 8)
WHERE u.role = 'customer';

-- Add extra non-default addresses for a subset of users.
INSERT INTO bally.address (
    unit_number,
    street_number,
    address_line1,
    address_line2,
    city,
    region,
    postal_code,
    country_id
)
SELECT
    NULL,
    (1 + floor(random() * 9999))::int::text,
    'Second Street ' || left(u.id::text, 8),
    NULL,
    (ARRAY['Chicago', 'Vancouver', 'Manchester', 'Melbourne', 'Munich', 'Lyon'])[1 + floor(random() * 6)::int],
    NULL,
    lpad((10000 + floor(random() * 89999))::int::text, 5, '0'),
    (SELECT id FROM bally.country ORDER BY random() LIMIT 1)
FROM bally.users u
WHERE u.role = 'customer'
  AND random() < 0.35;

INSERT INTO bally.user_address (user_id, address_id, is_default)
SELECT
    u.id,
    a.id,
    false
FROM bally.users u
JOIN bally.address a
    ON a.address_line1 = 'Second Street ' || left(u.id::text, 8)
WHERE u.role = 'customer';

-- ORDERS (1-3 per customer)
INSERT INTO bally.orders (user_id, address_id, status, tracking_id, total_amount)
SELECT
    u.id,
    (
        SELECT ua.address_id
        FROM bally.user_address ua
        WHERE ua.user_id = u.id
        ORDER BY random()
        LIMIT 1
    ) AS address_id,
    (ARRAY['processing', 'shipped', 'delivered', 'cancelled'])[1 + floor(random() * 4)::int]::bally.order_status AS status,
    'TRK-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12)) AS tracking_id,
    0.00::numeric(10, 2) AS total_amount
FROM bally.users u
JOIN LATERAL generate_series(1, (1 + floor(random() * 3))::int) gs(n) ON true
WHERE u.role = 'customer';

-- ORDER ITEMS (1-4 per order)
INSERT INTO bally.order_items (order_id, product_id, product_name, unit_price, quantity)
SELECT
    o.id,
    p.id,
    p.name,
    p.price,
    (1 + floor(random() * 3))::int AS quantity
FROM bally.orders o
JOIN LATERAL generate_series(1, (1 + floor(random() * 4))::int) gs(n) ON true
JOIN LATERAL (
    SELECT id, name, price
    FROM bally.product
    ORDER BY random()
    LIMIT 1
) p ON true;

-- Recompute order totals from inserted line items.
UPDATE bally.orders o
SET total_amount = s.total
FROM (
    SELECT
        oi.order_id,
        round(sum(oi.unit_price * oi.quantity)::numeric, 2) AS total
    FROM bally.order_items oi
    GROUP BY oi.order_id
) s
WHERE o.id = s.order_id;

COMMIT;

-- Quick sanity checks
SELECT 'users' AS table_name, count(*) AS rows FROM bally.users
UNION ALL SELECT 'products', count(*) FROM bally.product
UNION ALL SELECT 'carts', count(*) FROM bally.carts
UNION ALL SELECT 'orders', count(*) FROM bally.orders
UNION ALL SELECT 'order_items', count(*) FROM bally.order_items;
