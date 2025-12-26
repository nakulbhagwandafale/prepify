import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const cookieStore = cookies();

    // Create authenticated Supabase client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    cookieStore.set({ name, value, ...options });
                },
                remove(name: string, options: CookieOptions) {
                    cookieStore.set({ name, value: "", ...options });
                },
            },
        }
    );

    try {
        const { category, difficulty, score, feedback, json_report } = await req.json();

        // Get user from session (more secure than trusting body)
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!score || !category) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("interviews")
            .insert([
                {
                    user_id: user.id,
                    category,
                    difficulty,
                    score,
                    feedback,
                    json_report,
                },
            ])
            .select();

        if (error) {
            console.error("Supabase Write Error:", error);
            throw error;
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Error saving interview:", error);
        return NextResponse.json(
            { error: error.message || "Failed to save interview result" },
            { status: 500 }
        );
    }
}
