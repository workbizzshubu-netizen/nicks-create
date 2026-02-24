"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ─────────────────────────────────────────────────
// ENQUIRY ACTIONS
// ─────────────────────────────────────────────────

export async function submitEnquiry(formData: {
    name: string; phone: string; email: string; service: string;
}) {
    try {
        const enquiry = await prisma.enquiry.create({
            data: {
                name: formData.name,
                phoneNumber: formData.phone,
                email: formData.email,
                solution: formData.service,
            },
        });
        return { success: true, enquiry };
    } catch (error) {
        console.error("Failed to submit enquiry:", error);
        return { success: false, error: "Failed to submit enquiry" };
    }
}

export async function getEnquiries() {
    try {
        return await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
    } catch { return []; }
}

export async function markAsRead(id: string) {
    try {
        await prisma.enquiry.update({ where: { id }, data: { read: true } });
        revalidatePath("/admin/enquiries");
        revalidatePath("/admin");
        return { success: true };
    } catch { return { success: false }; }
}

export async function deleteEnquiry(id: string) {
    try {
        await prisma.enquiry.delete({ where: { id } });
        revalidatePath("/admin/enquiries");
        revalidatePath("/admin");
        return { success: true };
    } catch { return { success: false }; }
}

// ─────────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────────

export async function getDashboardStats() {
    try {
        const totalEnquiries = await prisma.enquiry.count();
        const unreadEnquiries = await prisma.enquiry.count({ where: { read: false } });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayEnquiries = await prisma.enquiry.count({ where: { createdAt: { gte: today } } });

        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);
        const monthEnquiries = await prisma.enquiry.count({ where: { createdAt: { gte: thisMonth } } });

        const activeClients = await prisma.client.count({ where: { status: "active" } });
        const ongoingProjects = await prisma.project.count({ where: { status: "ongoing" } });

        // Current billing month key e.g. "2026-02"
        const now = new Date();
        const currentBillingMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        // Monthly earnings: sum(task.price) for fully paid projects in current billing month
        const paidThisMonth = await prisma.project.findMany({
            where: { isFullyPaid: true, billingMonth: currentBillingMonth },
            include: { tasks: { select: { price: true } } },
        });
        const monthlyEarnings = paidThisMonth.reduce(
            (sum, p) => sum + p.tasks.reduce((s, t) => s + t.price, 0), 0
        );

        // Pending: sum of (totalAmount - advance) for all unpaid projects
        const unpaidProjects = await prisma.project.findMany({
            where: { isFullyPaid: false },
            include: { tasks: { select: { price: true } } },
        });
        const totalPending = unpaidProjects.reduce((sum, p) => {
            const total = p.tasks.reduce((s, t) => s + t.price, 0);
            return sum + Math.max(0, total - p.advanceReceived);
        }, 0);

        return {
            total: totalEnquiries,
            unread: unreadEnquiries,
            today: todayEnquiries,
            month: monthEnquiries,
            activeClients,
            ongoingProjects,
            monthlyEarnings,
            totalPending,
        };
    } catch (error) {
        console.error("getDashboardStats failed:", error);
        return {
            total: 0, unread: 0, today: 0, month: 0,
            activeClients: 0, ongoingProjects: 0, monthlyEarnings: 0, totalPending: 0,
        };
    }
}

// ─────────────────────────────────────────────────
// REVENUE DATA (charts — grouped by billingMonth)
// ─────────────────────────────────────────────────

export async function getRevenueData() {
    try {
        const projects = await prisma.project.findMany({
            where: { isFullyPaid: true, billingMonth: { not: "" } },
            include: { tasks: { select: { price: true } } },
        });

        const monthlyMap: Record<string, number> = {};
        projects.forEach((p) => {
            const key = p.billingMonth; // "2026-02"
            const total = p.tasks.reduce((s, t) => s + t.price, 0);
            monthlyMap[key] = (monthlyMap[key] || 0) + total;
        });

        const result = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            const label = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
            result.push({ month: label, revenue: monthlyMap[key] || 0 });
        }
        return result;
    } catch { return []; }
}

// ─────────────────────────────────────────────────
// DEADLINES & OVERDUE
// ─────────────────────────────────────────────────

export async function getUpcomingDeadlines() {
    try {
        return await prisma.project.findMany({
            where: { status: "ongoing", deadline: { not: null } },
            include: { client: true },
            orderBy: { deadline: "asc" },
            take: 10,
        });
    } catch { return []; }
}

export async function getOverdueTasks() {
    try {
        // Tasks with no completion but project is ongoing (no dueDate anymore, just show pending tasks)
        return await prisma.task.findMany({
            where: { status: "pending" },
            include: { project: { include: { client: true } } },
            orderBy: { createdAt: "asc" },
            take: 10,
        });
    } catch { return []; }
}

// ─────────────────────────────────────────────────
// CLIENT ACTIONS
// ─────────────────────────────────────────────────

export async function getClients() {
    try {
        return await prisma.client.findMany({
            include: { projects: true },
            orderBy: { createdAt: "desc" },
        });
    } catch { return []; }
}

export async function createClient(data: {
    name: string; email?: string; phone?: string; company?: string; notes?: string;
}) {
    try {
        const client = await prisma.client.create({
            data: {
                name: data.name,
                email: data.email || null,
                phone: data.phone || null,
                company: data.company || null,
                notes: data.notes || "",
            },
        });
        revalidatePath("/admin/clients");
        revalidatePath("/admin");
        return { success: true, client };
    } catch (error) {
        console.error("createClient failed:", error);
        return { success: false };
    }
}

export async function updateClient(id: string, data: {
    name?: string; email?: string; phone?: string;
    company?: string; status?: string; notes?: string;
}) {
    try {
        await prisma.client.update({ where: { id }, data });
        revalidatePath("/admin/clients");
        revalidatePath("/admin");
        return { success: true };
    } catch { return { success: false }; }
}

export async function deleteClient(id: string) {
    try {
        await prisma.client.delete({ where: { id } });
        revalidatePath("/admin/clients");
        revalidatePath("/admin");
        return { success: true };
    } catch { return { success: false }; }
}

// ─────────────────────────────────────────────────
// PROJECT ACTIONS
// ─────────────────────────────────────────────────

export async function getProjects() {
    try {
        return await prisma.project.findMany({
            include: { client: true, tasks: true },
            orderBy: { createdAt: "desc" },
        });
    } catch { return []; }
}

export async function getProjectById(id: string) {
    try {
        return await prisma.project.findUnique({
            where: { id },
            include: {
                client: true,
                tasks: { orderBy: { createdAt: "asc" } },
            },
        });
    } catch { return null; }
}

export async function createProject(data: {
    title: string;
    clientId: string;
    billingMonth: string;
    advanceReceived?: number;
    deadline?: string;
}) {
    try {
        const project = await prisma.project.create({
            data: {
                title: data.title,
                clientId: data.clientId,
                billingMonth: data.billingMonth,
                advanceReceived: data.advanceReceived ?? 0,
                deadline: data.deadline ? new Date(data.deadline) : null,
            },
        });
        revalidatePath("/admin/projects");
        revalidatePath("/admin");
        return { success: true, project };
    } catch (error) {
        console.error("createProject failed:", error);
        return { success: false };
    }
}

export async function updateProject(id: string, data: {
    title?: string;
    status?: string;
    billingMonth?: string;
    deadline?: string | null;
    advanceReceived?: number;
}) {
    try {
        const updateData: Record<string, unknown> = { ...data };
        if (data.deadline !== undefined) {
            updateData.deadline = data.deadline ? new Date(data.deadline) : null;
        }
        await prisma.project.update({ where: { id }, data: updateData });
        revalidatePath("/admin/projects");
        revalidatePath(`/admin/projects/${id}`);
        revalidatePath("/admin/finance");
        revalidatePath("/admin");
        return { success: true };
    } catch { return { success: false }; }
}

export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({ where: { id } });
        revalidatePath("/admin/projects");
        revalidatePath("/admin");
        return { success: true };
    } catch { return { success: false }; }
}

export async function toggleProjectFullyPaid(id: string, isFullyPaid: boolean) {
    try {
        await prisma.project.update({
            where: { id },
            data: {
                isFullyPaid,
                status: isFullyPaid ? "completed" : "ongoing",
            },
        });
        revalidatePath("/admin/projects");
        revalidatePath(`/admin/projects/${id}`);
        revalidatePath("/admin/finance");
        revalidatePath("/admin");
        return { success: true };
    } catch { return { success: false }; }
}

// ─────────────────────────────────────────────────
// FINANCE DATA
// ─────────────────────────────────────────────────

export async function getFinanceData() {
    try {
        const projects = await prisma.project.findMany({
            include: { client: true, tasks: { select: { price: true } } },
            orderBy: { createdAt: "desc" },
        });

        return projects.map((project) => {
            const totalAmount = project.tasks.reduce((s, t) => s + t.price, 0);
            const remaining = project.isFullyPaid
                ? 0
                : Math.max(0, totalAmount - project.advanceReceived);

            return {
                id: project.id,
                title: project.title,
                clientName: project.client.name,
                billingMonth: project.billingMonth,
                totalAmount,
                advanceReceived: project.advanceReceived,
                remaining,
                isFullyPaid: project.isFullyPaid,
                status: project.status,
                createdAt: project.createdAt,
            };
        });
    } catch (error) {
        console.error("getFinanceData failed:", error);
        return [];
    }
}

// ─────────────────────────────────────────────────
// TASK ACTIONS (always project-scoped)
// ─────────────────────────────────────────────────

export async function createTask(data: {
    title: string;
    price: number;
    projectId: string;
}) {
    try {
        await prisma.task.create({
            data: {
                title: data.title,
                price: data.price,
                projectId: data.projectId,
            },
        });
        revalidatePath(`/admin/projects/${data.projectId}`);
        revalidatePath("/admin/finance");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("createTask failed:", error);
        return { success: false };
    }
}

export async function updateTask(id: string, data: {
    title?: string;
    price?: number;
    status?: string;
}) {
    try {
        const task = await prisma.task.update({ where: { id }, data });
        revalidatePath(`/admin/projects/${task.projectId}`);
        revalidatePath("/admin/finance");
        revalidatePath("/admin");
        return { success: true };
    } catch { return { success: false }; }
}

export async function deleteTask(id: string) {
    try {
        const task = await prisma.task.findUnique({ where: { id }, select: { projectId: true } });
        await prisma.task.delete({ where: { id } });
        if (task?.projectId) {
            revalidatePath(`/admin/projects/${task.projectId}`);
        }
        revalidatePath("/admin/finance");
        revalidatePath("/admin");
        return { success: true };
    } catch { return { success: false }; }
}

// getTasks kept for backward compat (standalone tasks page still exists)
export async function getTasks() {
    try {
        return await prisma.task.findMany({ orderBy: { createdAt: "asc" } });
    } catch { return []; }
}
