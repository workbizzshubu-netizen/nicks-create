import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

// Payments route replaced — use /api/admin/projects/toggle-paid instead
// This route is kept as a stub to avoid 404s from old references

export async function POST() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Payment model removed. Use project advanceReceived instead." }, { status: 410 });
}

export async function PATCH() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Payment model removed. Use project isFullyPaid instead." }, { status: 410 });
}
