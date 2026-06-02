DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS auth_provider;
DROP EXTENSION IF EXISTS "pgcrypto";

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE user_role AS ENUM ('customer', 'admin');
CREATE TYPE auth_provider AS ENUM ('local', 'google');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    auth_provider auth_provider NOT NULL DEFAULT 'local',
    provider_id VARCHAR(255),
    UNIQUE(auth_provider, provider_id)
);

CREATE UNIQUE INDEX idx_users_email ON users (email);