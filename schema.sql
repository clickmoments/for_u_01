-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('buyer', 'seller', 'admin')) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Buyers table
CREATE TABLE buyers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    pan VARCHAR(20) UNIQUE NOT NULL,
    buyer_id VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sellers table
CREATE TABLE sellers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100),
    gst_id VARCHAR(20) UNIQUE NOT NULL,
    industry_sector VARCHAR(100),
    num_employees INTEGER,
    seller_id VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id VARCHAR(20) REFERENCES sellers(seller_id),
    buyer_id VARCHAR(20) REFERENCES buyers(buyer_id),
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Reward Points table
CREATE TABLE reward_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id VARCHAR(20) REFERENCES buyers(buyer_id),
    points INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Reward Rules table
CREATE TABLE reward_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    points_per_100_rs INTEGER DEFAULT 1,
    threshold INTEGER DEFAULT 1000,
    updated_by_admin BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT NOW()
);
