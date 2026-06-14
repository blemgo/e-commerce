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
        'Singapore'
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
        ('Men', NULL),
        ('Women', NULL);

    INSERT INTO bally.product_category (category_name, parent_category_id)
    VALUES
        ('Shirts', (SELECT id FROM bally.product_category WHERE category_name = 'Men' LIMIT 1)),
        ('Ziptrack', (SELECT id FROM bally.product_category WHERE category_name = 'Men' LIMIT 1)),
        ('Jewelry', (SELECT id FROM bally.product_category WHERE category_name = 'Men' LIMIT 1)),
        ('Shirts', (SELECT id FROM bally.product_category WHERE category_name = 'Women' LIMIT 1)),
        ('Cheese', (SELECT id FROM bally.product_category WHERE category_name = 'Women' LIMIT 1));

    INSERT INTO bally.product_category (category_name, parent_category_id)
    VALUES
        ('Scandinavian', (SELECT id FROM bally.product_category WHERE category_name = 'Cheese' LIMIT 1)),
        ('Gauda', (SELECT id FROM bally.product_category WHERE category_name = 'Cheese' LIMIT 1));

    -- PRODUCTS
    -- Scraped from racerworldwide.net Spring/Summer 26 collection.
    INSERT INTO bally.product (name, product_image, qty_in_stock, price)
    VALUES
        ('Biker Leather Jacket', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/BikerLeatherJacketLB3_cropFF_m1.jpg?v=1779444596', 18, 320.00),
        ('Fitted Lambskin Jacket', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/slimleatherjacket_front2.jpg?v=1779358536', 7, 320.00),
        ('Plaid Twill Work Shirt', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Plaid_Twill_Shirt_FL_3_FF.jpg?v=1779440250', 143, 115.00),
        ('Bleached Studded Denim', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Studded_Jeans_LB_1_FF.jpg?v=1779441867', 64, 145.00),
        ('Coated Fitted Knit Hoodie', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Waxed_Wide_Rib_Hoodie_Knit_LB_2_crop_FF_f33be629-2433-419a-87d3-628a3686c6cc.jpg?v=1779440175', 31, 120.00),
        ('Fitted Knit Hoodie', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Black_Wide_Rib_Hoodie_Knit_LB_3_crop_FF.jpg?v=1779440528', 88, 100.00),
        ('Teeth Chain Necklace', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Real_Teeth_Necklace_FL_1_FF.jpg?v=1779385424', 25, 110.00),
        ('Black Racer Boxers 2 Pack', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/BoxerTrunksFL_black_FF_1.jpg?v=1779386280', 176, 40.00),
        ('Denim Racer Boxers 2 Pack', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Boxer_Trunks_FL_jeans_FF_1.jpg?v=1779384985', 112, 50.00),
        ('Grey Racer Boxers 2 Pack', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/studdedjeans_crop1_b009de50-48d8-414a-91d4-66b84e6cfd1d.jpg?v=1779386088', 159, 40.00),
        ('Racer x Remagine 1998 Boot', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Soccer_Sneakers_FL_7_FF.jpg?v=1775484041', 12, 260.00),
        ('Pyramid Embossed Denim', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Baggy_Embossed_Jeans_LB_3_FF_new_m1.jpg?v=1776357816', 47, 160.00),
        ('Bat-Wing Transformer Hoodie', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Bat_Wing_Hoodie_LB_12_FF.jpg?v=1775376745', 53, 160.00),
        ('Bat-Wing Sweatpants', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Bat_Wing_Pants_LB_2_FF.jpg?v=1775374771', 39, 140.00),
        ('Coffee Grinder 42', 'https://fastly.picsum.photos/id/1025/600/600.jpg?hmac=QxUzH7h9kBHUn--LQyNnjygtja2kCvjMxEmZT-z912U', 39, 49.00);
        -- ('Everyday Jersey Blazer Jacket', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Blazer_Jersey_LB_1_FF.jpg?v=1779439655', 21, 180.00),
        -- ('Racer Worldwide Oversized Long Sleeve', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Oversized_LS_LB_5_FF.jpg?v=1779440710', 97, 95.00),
        -- ('Racer Worldwide Oversized T-Shirt', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Oversized_Tee_LB_5_FF.jpg?v=1779440829', 204, 65.00),
        -- ('Racer Logo T-Shirt', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Racer_Logo_Tee_LB_FF.jpg?v=1779440906', 231, 50.00),
        -- ('Racer Worldwide Classic Hoodie', 'https://cdn.shopify.com/s/files/1/0106/3144/6628/files/Classic_Hoodie_LB_FF.jpg?v=1779441032', 74, 115.00);

    -- PRODUCT-CATEGORY LINKS (hand-assigned; category resolved by name + parent)
    INSERT INTO bally.product_category_link (product_id, product_category_id)
    SELECT p.id, c.id
    FROM (VALUES
        ('Biker Leather Jacket',      'Ziptrack',     'Men'),
        ('Fitted Lambskin Jacket',    'Ziptrack',     'Men'),
        ('Fitted Lambskin Jacket',    'Shirts',       'Women'),
        ('Plaid Twill Work Shirt',    'Shirts',       'Men'),
        ('Bleached Studded Denim',    'Ziptrack',     'Men'),
        ('Coated Fitted Knit Hoodie', 'Ziptrack',     'Men'),
        ('Coated Fitted Knit Hoodie', 'Shirts',       'Women'),
        ('Fitted Knit Hoodie',        'Shirts',       'Women'),
        ('Teeth Chain Necklace',      'Jewelry',      'Men'),
        ('Black Racer Boxers 2 Pack', 'Shirts',       'Men'),
        ('Denim Racer Boxers 2 Pack', 'Shirts',       'Men'),
        ('Denim Racer Boxers 2 Pack', 'Gauda',        'Cheese'),
        ('Grey Racer Boxers 2 Pack',  'Scandinavian', 'Cheese'),
        ('Racer x Remagine 1998 Boot','Ziptrack',     'Men'),
        ('Pyramid Embossed Denim',    'Ziptrack',     'Men'),
        ('Pyramid Embossed Denim',    'Jewelry',      'Men'),
        ('Bat-Wing Transformer Hoodie','Shirts',      'Women'),
        ('Bat-Wing Sweatpants',       'Ziptrack',     'Men'),
        ('Bat-Wing Sweatpants',       'Gauda',        'Cheese'),
        ('Coffee Grinder 42',         'Scandinavian', 'Cheese')
    ) AS a(product_name, category_name, parent_name)
    JOIN bally.product p ON p.name = a.product_name
    JOIN bally.product_category c ON c.category_name = a.category_name
    JOIN bally.product_category parent
        ON parent.id = c.parent_category_id
        AND parent.category_name = a.parent_name
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
