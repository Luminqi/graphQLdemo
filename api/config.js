import dotenv from 'dotenv';

dotenv.config({ silent: true });

export const {
  ENGINE_API_KEY,
  JWT_SECRET,
} = process.env;