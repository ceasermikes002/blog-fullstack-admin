import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  const origin = req.headers.get('origin');
  const allowedOrigins = ['http://localhost:3001', 'https://goldfish-amusing-ghastly.ngrok-free.app'];

  const response = NextResponse.next();
  
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
