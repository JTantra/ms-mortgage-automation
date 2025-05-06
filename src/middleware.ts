import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  console.log("Request", request.nextUrl.pathname);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - .swa (Azure Static Web Apps)
     */
    '/((?!.swa).*)',
  ],
}