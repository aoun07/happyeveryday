import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.APP_PASSWORD || '1234';

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      
      response.cookies.set({
        name: 'admin_auth',
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 86400, // 1 วัน
      });

      return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}