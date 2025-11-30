-- Initialize Eventure database
-- This script runs automatically when the container first starts

\c eventure;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Log initialization
SELECT 'Database initialized successfully' AS status;
