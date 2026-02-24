import { getProjectById } from "@/lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProjectDetailClient } from "@/components/admin/ProjectDetailClient";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage(props: Props) {
    const params = await props.params;
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    const project = await getProjectById(params.id);
    if (!project) notFound();

    const totalAmount = project.tasks.reduce((s, t) => s + t.price, 0);
    const remaining = project.isFullyPaid
        ? 0
        : Math.max(0, totalAmount - project.advanceReceived);

    // Format billing month for display e.g. "2026-02" → "Feb 2026"
    const billingLabel = project.billingMonth
        ? (() => {
            const [y, m] = project.billingMonth.split("-");
            const d = new Date(parseInt(y), parseInt(m) - 1, 1);
            return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
        })()
        : "—";

    return (
        <div className="p-8 lg:p-12 max-w-4xl mx-auto">

            {/* Back */}
            <Link
                href="/admin/projects"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 hover:text-white/60 transition-colors mb-8"
            >
                <ChevronLeft size={13} /> Projects
            </Link>

            {/* Header */}
            <div className="mb-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/25 mb-3">
                    TBM Client OS / Projects / Detail
                </p>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                            <span className="text-sm text-white/40">
                                Client: <span className="text-cyan-400 font-semibold">{project.client.name}</span>
                            </span>
                            {project.billingMonth && (
                                <span className="text-sm text-white/40">
                                    · Billing: <span className="text-violet-400 font-semibold">{billingLabel}</span>
                                </span>
                            )}
                            {project.deadline && (
                                <span className="text-sm text-white/40">
                                    · Due: <span className="text-amber-400 font-semibold">
                                        {new Date(project.deadline).toLocaleDateString("en-IN", {
                                            day: "numeric", month: "short", year: "numeric"
                                        })}
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                    <span className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border ${project.isFullyPaid
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                        : "bg-cyan-500/15 text-cyan-400 border-cyan-500/20"
                        }`}>
                        {project.isFullyPaid ? "Fully Paid" : project.status}
                    </span>
                </div>
            </div>

            {/* Quick stat bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                    { label: "Total", value: `₹${totalAmount.toLocaleString("en-IN")}`, c: "text-white" },
                    { label: "Advance", value: `₹${project.advanceReceived.toLocaleString("en-IN")}`, c: "text-cyan-400" },
                    { label: "Remaining", value: `₹${remaining.toLocaleString("en-IN")}`, c: remaining > 0 ? "text-amber-400" : "text-emerald-400" },
                    { label: "Tasks", value: `${project.tasks.filter(t => t.status === "completed").length} / ${project.tasks.length}`, c: "text-violet-400" },
                ].map(s => (
                    <div key={s.label} className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.05]">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 mb-1.5">{s.label}</p>
                        <p className={`text-lg font-black ${s.c}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Interactive section */}
            <ProjectDetailClient
                project={{
                    id: project.id,
                    title: project.title,
                    billingMonth: project.billingMonth,
                    advanceReceived: project.advanceReceived,
                    isFullyPaid: project.isFullyPaid,
                    status: project.status,
                    client: { id: project.client.id, name: project.client.name },
                    tasks: project.tasks,
                    createdAt: project.createdAt,
                    deadline: project.deadline,
                }}
            />
        </div>
    );
}
