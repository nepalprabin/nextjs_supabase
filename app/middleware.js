import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware (req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: {user},
    } = await supabase.auth.User;

    // if user is signed in and current path is /, redirect user to /account page
    if (user && req.nextUrl.pathname==='/') {
        return NextResponse.redirect(new URL('/account'), req.url);
    }

    // if user is not signed in and current path is not /, redirect user to / page
    if (!user && req.nextUrl.pathname!=='/') {
        return NextResponse.redirect(new URL('/'), req.url);
    }
    return res
} 

export const config = {
    matcher: ['/', '/account']
}