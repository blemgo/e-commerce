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

DROP TABLE IF EXISTS bally.product_category CASCADE;
DROP TABLE IF EXISTS bally.product CASCADE;
 
CREATE TABLE bally.product_category (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_category_id  uuid,
    category_name       text NOT NULL,
    CONSTRAINT fk_product_category_parent
        FOREIGN KEY (parent_category_id)
        REFERENCES bally.product_category (id)
        ON DELETE SET NULL
);

CREATE INDEX idx_product_category_parent_category_id
    ON bally.product_category (parent_category_id);

CREATE TABLE bally.product (
    id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id    uuid,
    name           text NOT NULL,
    description    text,
    product_image  text,
    qty_in_stock   int  NOT NULL DEFAULT 0,
    price          decimal(10,2) NOT NULL,
    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id)
        REFERENCES bally.product_category (id)
        ON DELETE SET NULL
);

CREATE INDEX idx_product_category_id ON bally.product (category_id);
CREATE INDEX idx_product_name        ON bally.product (name);
