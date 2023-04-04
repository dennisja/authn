const PORT = Number(process.env.API_PORT) || 4000;

const DATABASE_URL = process.env.DATABASE_URL || "";

const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID || "";

export { PORT, DATABASE_URL, GOOGLE_AUTH_CLIENT_ID };
