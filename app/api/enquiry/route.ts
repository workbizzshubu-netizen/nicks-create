import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phoneNumber, email, solution } = body;

        if (!name || !phoneNumber || !email || !solution) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        const enquiry = await prisma.enquiry.create({
            data: { name, phoneNumber, email, solution },
        });

        return NextResponse.json({ success: true, enquiry });
    } catch (error) {
        console.error("Enquiry error:", error);
        return NextResponse.json({ error: "Failed to save enquiry" }, { status: 500 });
    }
}