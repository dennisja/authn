const PORT = Number(process.env.API_PORT) || 4000;

const DATABASE_URL = process.env.DATABASE_URL || "";

const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID || "";

const AUTH_TOKEN_SECRET_KEY = process.env.AUTH_TOKEN_SECRET_KEY || "";

export { PORT, DATABASE_URL, GOOGLE_AUTH_CLIENT_ID, AUTH_TOKEN_SECRET_KEY };
