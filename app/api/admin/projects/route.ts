import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const projects = await prisma.project.findMany({
            include: { client: true, tasks: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(projects);
    } catch {
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { title, clientId, billingMonth, advanceReceived, deadline } = body;

        if (!title || !clientId) {
            return NextResponse.json({ error: "Title and Client are required" }, { status: 400 });
        }

        const project = await prisma.project.create({
            data: {
                title,
                clientId,
                billingMonth: billingMonth || "",
                advanceReceived: parseFloat(advanceReceived) || 0,
                deadline: deadline ? new Date(deadline) : null,
            },
        });

        return NextResponse.json(project, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
