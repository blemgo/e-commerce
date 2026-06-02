DROP TABLE IF EXISTS bally.users CASCADE;
DROP TYPE IF EXISTS bally.user_role;
DROP TYPE IF EXISTS bally.auth_provider;
DROP EXTENSION IF EXISTS "pgcrypto";

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE bally.user_role AS ENUM ('customer', 'admin');
CREATE TYPE bally.auth_provider AS ENUM ('local', 'google');

CREATE TABLE bally.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    auth_provider auth_provider NOT NULL DEFAULT 'local',
    provider_id VARCHAR(255),
    UNIQUE(auth_provider, provider_id)
);

CREATE UNIQUE INDEX idx_users_email ON bally.users (email);