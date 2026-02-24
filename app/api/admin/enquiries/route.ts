import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const enquiries = await prisma.enquiry.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(enquiries);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
    }
}
