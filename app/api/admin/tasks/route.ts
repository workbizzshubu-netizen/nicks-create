import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const tasks = await prisma.task.findMany({
            include: { project: { include: { client: true } } },
            orderBy: { createdAt: "asc" },
        });
        return NextResponse.json(tasks);
    } catch {
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { title, price, projectId } = body;

        if (!title || !projectId) {
            return NextResponse.json({ error: "Title and projectId are required" }, { status: 400 });
        }

        const task = await prisma.task.create({
            data: {
                title,
                price: parseFloat(price) || 0,
                projectId,
            },
        });

        return NextResponse.json(task, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
}
