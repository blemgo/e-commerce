DROP TABLE IF EXISTS bally.users CASCADE;
DROP TYPE IF EXISTS bally.user_role;
DROP TYPE IF EXISTS bally.auth_provider;
DROP EXTENSION IF EXISTS "pgcrypto";

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE bally.user_role AS ENUM ('customer', 'admin');
CREATE TYPE bally.auth_provider AS ENUM ('local', 'google');

CREATE TABLE bally.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    password_hash TEXT,
    full_name VARCHAR(100) NOT NULL CHECK (full_name ~ '^[a-zA-Z\s]+$' && length(full_name) >= 2),
    role user_role NOT NULL DEFAULT 'customer',
    auth_provider auth_provider NOT NULL DEFAULT 'local',
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
    price          decimal(10,2) NOT NULL,
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