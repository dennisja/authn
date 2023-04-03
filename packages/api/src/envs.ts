const PORT = Number(process.env.API_PORT) || 4000;

const DATABASE_URL = process.env.DATABASE_URL || "";

export { PORT, DATABASE_URL };
