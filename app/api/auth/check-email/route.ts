import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!hasServiceKey) {
            console.error("SUPABASE_SERVICE_ROLE_KEY is missing");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        // Call the secure RPC function
        const { data, error } = await supabaseAdmin.rpc('check_email_exists', {
            email_arg: email
        });

        if (error) {
            console.error("Supabase RPC Error:", error);
            // Return false to allow signup to fail gracefully in Supabase if RPC is broken
            return NextResponse.json({ exists: false });
        }

        return NextResponse.json({ exists: data });

    } catch (error) {
        console.error("Unexpected error in check-email API:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
