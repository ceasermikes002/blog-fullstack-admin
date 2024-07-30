import { NextRequest, NextResponse } from 'next/server';

export function likeCors(req: NextRequest, res: NextResponse): boolean {
  res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PATCH,DELETE,PUT');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.headers.set('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return true;
  }

  return false;
}
