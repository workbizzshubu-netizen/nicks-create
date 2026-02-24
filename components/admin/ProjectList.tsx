"use client";

import { useState } from "react";
import { createProject, deleteProject } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, X, Trash2, Calendar, ArrowUpRight, CalendarDays } from "lucide-react";

interface Task {
    id: string;
    price: number;
    status: string;
}

interface Project {
    id: string;
    title: string;
    billingMonth: string;
    deadline: Date | null;
    status: string;
    advanceReceived: number;
    isFullyPaid: boolean;
    clientId: string;
    client: { id: string; name: string };
    tasks: Task[];
    createdAt: Date;
}

interface Props {
    initialProjects: Project[];
    clients: { id: string; name: string }[];
}

const statusStyles: Record<string, string> = {
    ongoing: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

function formatBillingMonth(bm: string): string {
    if (!bm) return "";
    const [y, m] = bm.split("-");
    const d = new Date(parseInt(y), parseInt(m) - 1, 1);
    return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

// Generate last 12 months as "YYYY-MM" options for select
function buildMonthOptions(): { value: string; label: string }[] {
    const opts = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        const label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
        opts.push({ value, label });
    }
    return opts;
}

export function ProjectList({ initialProjects, clients }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const monthOptions = buildMonthOptions();
    const currentMonth = monthOptions[0].value;

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        await createProject({
            title: fd.get("title") as string,
            clientId: fd.get("clientId") as string,
            billingMonth: fd.get("billingMonth") as string,
            advanceReceived: parseFloat(fd.get("advanceReceived") as string) || 0,
            deadline: (fd.get("deadline") as string) || undefined,
        });
        setLoading(false);
        setShowForm(false);
        router.refresh();
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this project and all its tasks?")) return;
        await deleteProject(id);
        router.refresh();
    }

    return (
        <div>
            {/* Add Button */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-all"
                >
                    {showForm ? <X size={14} /> : <Plus size={14} />}
                    {showForm ? "Cancel" : "New Project"}
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <form onSubmit={handleCreate}
                    className="mb-8 p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">New Project</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="title"
                            placeholder="Project Title *"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-cyan-500/30"
                        />
                        <select
                            name="clientId"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-[#0B0F19] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500/30"
                        >
                            <option value="">Select Client *</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <select
                            name="billingMonth"
                            defaultValue={currentMonth}
                            className="w-full px-4 py-3 rounded-xl bg-[#0B0F19] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500/30"
                        >
                            {monthOptions.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                        <input
                            name="advanceReceived"
                            type="number"
                            min="0"
                            placeholder="Advance Received (₹)"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-cyan-500/30"
                        />
                        <input
                            name="deadline"
                            type="date"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500/30 [color-scheme:dark]"
                        />
                    </div>
                    <p className="text-xs text-white/25">* Add tasks inside the project page to set prices — total is calculated automatically.</p>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all disabled:opacity-50"
                    >
                        {loading ? "Creating…" : "Create Project"}
                    </button>
                </form>
            )}

            {/* Project List */}
            {initialProjects.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-white/25 text-sm">No projects yet. Create your first project above.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {initialProjects.map((project) => {
                        const totalAmount = project.tasks.reduce((s, t) => s + t.price, 0);
                        const remaining = project.isFullyPaid
                            ? 0
                            : Math.max(0, totalAmount - project.advanceReceived);
                        const progress = project.isFullyPaid
                            ? 100
                            : totalAmount > 0
                                ? Math.min(100, (project.advanceReceived / totalAmount) * 100)
                                : 0;
                        const deadline = project.deadline ? new Date(project.deadline) : null;
                        const pendingCount = project.tasks.filter(t => t.status === "pending").length;

                        return (
                            <div key={project.id}
                                className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                                    {/* Left */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2.5 flex-wrap mb-1">
                                            <h3 className="text-base font-bold text-white">{project.title}</h3>
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${project.isFullyPaid
                                                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                                                    : statusStyles[project.status] || statusStyles.ongoing
                                                }`}>
                                                {project.isFullyPaid ? "Paid" : project.status}
                                            </span>
                                            {pendingCount > 0 && (
                                                <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/15">
                                                    {pendingCount} task{pendingCount !== 1 ? "s" : ""}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-white/30">{project.client.name}</p>
                                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                                            {project.billingMonth && (
                                                <p className="text-xs text-violet-400/60 flex items-center gap-1">
                                                    <CalendarDays size={11} />
                                                    {formatBillingMonth(project.billingMonth)}
                                                </p>
                                            )}
                                            {deadline && (
                                                <p className="text-xs text-white/25 flex items-center gap-1">
                                                    <Calendar size={11} />
                                                    {deadline.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Finance */}
                                    <div className="flex items-center gap-5">
                                        <div className="text-right">
                                            <p className="text-[9px] text-white/25 font-bold uppercase tracking-widest mb-0.5">Total</p>
                                            <p className="text-sm font-bold text-white">₹{totalAmount.toLocaleString("en-IN")}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] text-amber-400/50 font-bold uppercase tracking-widest mb-0.5">Due</p>
                                            <p className={`text-sm font-bold ${remaining > 0 ? "text-amber-400" : "text-emerald-400"}`}>
                                                ₹{remaining.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/projects/${project.id}`}
                                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider hover:bg-cyan-500/20 transition-all">
                                            <ArrowUpRight size={12} /> Open
                                        </Link>
                                        <button onClick={() => handleDelete(project.id)}
                                            className="p-2 rounded-xl text-white/15 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/15 transition-all">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                {totalAmount > 0 && (
                                    <div className="mt-4 h-0.5 rounded-full bg-white/[0.05] overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-700"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
