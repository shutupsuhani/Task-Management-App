import {clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const publicRoutes = [ "/api/webhooks/clerk"];
const isProtectedRoute = createRouteMatcher(['/task(.*)', '/']);

// Middleware handler
export default clerkMiddleware(async (auth, req) => {
    
    if (publicRoutes.includes(req.nextUrl.pathname)) {
        return;
    }

    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

// Configuration for route matching
export const config = {
    matcher: [
        '/',
        '/task(.*)',
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};


