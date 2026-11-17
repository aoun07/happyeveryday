import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // เช็กเฉพาะเส้นทางที่อยู่ใน /admin (ยกเว้นหน้า /admin ตัวเองที่เป็นหน้ากรอกรหัส)
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin') {
    const authCookie = request.cookies.get('admin_auth');
    
    // ถ้าไม่มีคุกกี้ปลดล็อก ให้ดีดกลับมาที่หน้า Login (/admin)
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

// กำหนดให้ middleware ทำงานกับเส้นทาง /admin ทั้งหมด
export const config = {
  matcher: '/admin/:path*',
};