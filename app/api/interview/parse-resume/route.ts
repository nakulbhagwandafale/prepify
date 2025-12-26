import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        let text = "";

        if (file.type === "application/pdf") {
            const pdfModule = (await import("pdf-parse-new")) as any;
            const pdf = pdfModule.default || pdfModule;
            const data = await pdf(buffer);
            text = data.text;
        } else if (
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const mammoth = (await import("mammoth")).default || (await import("mammoth"));
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
        } else if (file.type === "application/msword") {
            return NextResponse.json(
                { error: "Legacy Word documents (.doc) are not supported. Please convert to .docx or .pdf." },
                { status: 400 }
            );
        } else if (file.type === "text/plain") {
            text = await file.text();
        } else {
            return NextResponse.json(
                { error: "Unsupported file type. Please upload PDF, DOCX, or TXT." },
                { status: 400 }
            );
        }

        // Basic cleaning
        text = text.replace(/\s+/g, " ").trim();

        if (!text) {
            return NextResponse.json({ error: "Could not extract text from file." }, { status: 400 });
        }

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Error parsing resume:", error);
        return NextResponse.json(
            { error: "Failed to parse resume. Ensure the file is valid." },
            { status: 500 }
        );
    }
}
