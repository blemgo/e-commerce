DROP SCHEMA IF EXISTS bally CASCADE;

CREATE SCHEMA bally;

DROP TABLE IF EXISTS bally.users CASCADE;
DROP TYPE IF EXISTS bally.order_status;
DROP TYPE IF EXISTS bally.user_role;
DROP TYPE IF EXISTS bally.auth_provider;
DROP EXTENSION IF EXISTS "pgcrypto";

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TYPE IF EXISTS bally.user_role CASCADE;
DROP TYPE IF EXISTS bally.auth_provider CASCADE;

CREATE TYPE bally.user_role AS ENUM ('customer', 'admin');
CREATE TYPE bally.auth_provider AS ENUM ('local', 'google');

CREATE TABLE bally.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    password_hash TEXT,
    full_name TEXT NOT NULL CHECK (full_name ~ '^[a-zA-Z\s]+$' AND LENGTH(full_name) >= 2),
    role bally.user_role NOT NULL DEFAULT 'customer',
    auth_provider bally.auth_provider NOT NULL DEFAULT 'local',
    provider_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(auth_provider, provider_id)
);

CREATE UNIQUE INDEX idx_users_email ON bally.users (email);

DROP TABLE IF EXISTS bally.refresh_tokens CASCADE;

CREATE TABLE bally.refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES bally.users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_refresh_tokens_user_id ON bally.refresh_tokens(user_id);

-- PRODUCTS
-- TODO: update the names of users, product-category, product-category-link.
DROP TABLE IF EXISTS bally.product_category CASCADE;
DROP TABLE IF EXISTS bally.product CASCADE;
DROP TABLE IF EXISTS bally.product_category_link CASCADE;
 
CREATE TABLE bally.product_category (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_category_id  uuid,
    category_name       text NOT NULL,
    CONSTRAINT fk_product_category_parent
        FOREIGN KEY (parent_category_id)
        REFERENCES bally.product_category (id)
        ON DELETE SET NULL
);

CREATE TABLE bally.product (
    id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name           text NOT NULL,
    description    text,
    product_image  text,
    qty_in_stock   int  NOT NULL DEFAULT 0,
    price          decimal(10,2) NOT NULL
);

CREATE TABLE bally.product_category_link (
    product_id          uuid NOT NULL,
    product_category_id uuid NOT NULL,
    PRIMARY KEY (product_id, product_category_id),
    CONSTRAINT fk_pcl_product
        FOREIGN KEY (product_id)
        REFERENCES bally.product (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_pcl_category
        FOREIGN KEY (product_category_id)
        REFERENCES bally.product_category (id)
        ON DELETE CASCADE
);

-- CARTS
DROP TABLE IF EXISTS bally.cart_items CASCADE;
DROP TABLE IF EXISTS bally.carts CASCADE;

CREATE TABLE bally.carts (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL UNIQUE REFERENCES bally.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE bally.cart_items (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id    UUID NOT NULL REFERENCES bally.carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES bally.product(id) ON DELETE CASCADE,
    quantity   INT NOT NULL DEFAULT 1,
    UNIQUE (cart_id, product_id)
);

-- ADDRESSES
DROP TABLE IF EXISTS bally.user_address CASCADE;
DROP TABLE IF EXISTS bally.address CASCADE;
DROP TABLE IF EXISTS bally.country CASCADE;

CREATE TABLE bally.country (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_name text NOT NULL
);

CREATE TABLE bally.address (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_number   text,
    street_number text,
    address_line1 text NOT NULL,
    address_line2 text,
    city          text NOT NULL,
    region        text,
    postal_code   VARCHAR(20),
    country_id    UUID NOT NULL REFERENCES bally.country(id) ON DELETE RESTRICT
);

CREATE INDEX idx_address_country_id ON bally.address(country_id);

CREATE TABLE bally.user_address (
    user_id    UUID NOT NULL REFERENCES bally.users(id) ON DELETE CASCADE,
    address_id UUID NOT NULL REFERENCES bally.address(id) ON DELETE CASCADE,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id, address_id)
);

-- ORDERS
DROP TABLE IF EXISTS bally.order_items CASCADE;
DROP TABLE IF EXISTS bally.orders CASCADE;
DROP TYPE IF EXISTS bally.order_status CASCADE;

CREATE TYPE bally.order_status AS ENUM ('processing', 'shipped', 'delivered', 'cancelled');

CREATE TABLE bally.orders (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES bally.users(id) ON DELETE RESTRICT,
    address_id   UUID NOT NULL REFERENCES bally.address(id) ON DELETE RESTRICT,
    status       bally.order_status NOT NULL DEFAULT 'processing',
    tracking_id  TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at   TIMESTAMP NOT NULL DEFAULT now(),
    updated_at   TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_user_id ON bally.orders(user_id);

CREATE TABLE bally.order_items (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id     UUID NOT NULL REFERENCES bally.orders(id) ON DELETE CASCADE,
    product_id   UUID NOT NULL REFERENCES bally.product(id) ON DELETE RESTRICT,
    product_name text NOT NULL,
    unit_price   DECIMAL(10, 2) NOT NULL,
    quantity     INT NOT NULL
);

CREATE INDEX idx_order_items_order_id ON bally.order_items(order_id);