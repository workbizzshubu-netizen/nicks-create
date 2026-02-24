import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const unread = await prisma.enquiry.count({ where: { read: false } });
        return NextResponse.json({ unread });
    } catch (error) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
