import { NextApiRequest, NextApiResponse } from 'next';

export function cors(req: NextApiRequest, res: NextApiResponse) {
  const allowedOrigins = ['http://localhost:3001', 'https://goldfish-amusing-ghastly.ngrok-free.app']; // Replace with your specific origins

  if (req.headers.origin && allowedOrigins.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }

  return false;
}
