import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ตรวจสอบคุกกี้ความปลอดภัย
  const authCookie = request.cookies.get('admin_auth');

  if (!authCookie || authCookie.value !== 'true') {
    // ถ้าไม่มีคุกกี้ ให้ดีดกลับไปหน้า Login ทันที
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// กำหนด matcher ให้ดักเฉพาะหน้าลูกหลานใน admin แต่ไม่เอาหน้า /admin ตรงๆ
export const config = {
  matcher: ['/admin/order/:path*', '/admin/receipt/:path*'],
};