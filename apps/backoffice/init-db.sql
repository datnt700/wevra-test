-- Initialize Tavia database
-- This script runs automatically when the container first starts

\c tavia;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Log initialization
SELECT 'Database initialized successfully' AS status;
