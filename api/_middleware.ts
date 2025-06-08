import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/api/:path*',
};

export function middleware(request: NextRequest) {
  const start = Date.now();
  const url = new URL(request.url);
  
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Add request start time to headers
  requestHeaders.set('x-request-start', start.toString());
  
  // Log the request
  console.log(`[${new Date().toISOString()}] ${request.method} ${url.pathname}`);
  
  // Create a response object
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // Log when the response is complete
  response.headers.set('x-request-duration', (Date.now() - start).toString());
  
  return response;
}
