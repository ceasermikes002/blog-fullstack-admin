// lib/cors.ts
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  origin: process.env.NEXT_PUBLIC_FRONTEND_URL, // Replace with your frontend URL
});

// Helper function to run middleware
export function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
