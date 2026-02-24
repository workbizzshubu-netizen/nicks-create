"use client";

import { useState } from "react";
import { createTask, updateTask, deleteTask } from "@/lib/actions";
import { useRouter } from "next/navigation";
import {
    Plus,
    X,
    Trash2,
    Check,
    Circle,
    Calendar,
    AlertTriangle,
    ArrowUp,
    ArrowRight,
    ArrowDown,
} from "lucide-react";

interface Task {
    id: string;
    title: string;
    dueDate: Date | null;
    priority: string;
    status: string;
    createdAt: Date;
}

export function TaskList({ initialTasks }: { initialTasks: Task[] }) {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
    const router = useRouter();

    const priorityConfig: Record<string, { icon: any; color: string; bg: string }> = {
        high: { icon: ArrowUp, color: "text-red-400", bg: "bg-red-500/10" },
        medium: { icon: ArrowRight, color: "text-amber-400", bg: "bg-amber-500/10" },
        low: { icon: ArrowDown, color: "text-blue-400", bg: "bg-blue-500/10" },
    };

    const filteredTasks = initialTasks.filter((t) => {
        if (filter === "pending") return t.status === "pending";
        if (filter === "completed") return t.status === "completed";
        return true;
    });

    const pendingCount = initialTasks.filter((t) => t.status === "pending").length;
    const completedCount = initialTasks.filter((t) => t.status === "completed").length;

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        await createTask({
            title: fd.get("title") as string,
            dueDate: (fd.get("dueDate") as string) || undefined,
            priority: (fd.get("priority") as string) || "medium",
        });
        setLoading(false);
        setShowForm(false);
        router.refresh();
    }

    async function handleToggleStatus(task: Task) {
        const newStatus = task.status === "pending" ? "completed" : "pending";
        await updateTask(task.id, { status: newStatus });
        router.refresh();
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this task?")) return;
        await deleteTask(id);
        router.refresh();
    }

    return (
        <div>
            {/* Filter Tabs + Add Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                    {[
                        { key: "all", label: `All (${initialTasks.length})` },
                        { key: "pending", label: `Pending (${pendingCount})` },
                        { key: "completed", label: `Done (${completedCount})` },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key as any)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filter === tab.key
                                    ? "bg-white/[0.08] text-white border border-white/[0.1]"
                                    : "text-white/30 hover:text-white/50 hover:bg-white/[0.03]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-all"
                >
                    {showForm ? <X size={14} /> : <Plus size={14} />}
                    {showForm ? "Cancel" : "New Task"}
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <form
                    onSubmit={handleCreate}
                    className="mb-8 p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            name="title"
                            placeholder="Task Title *"
                            required
                            className="w-full md:col-span-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-cyan-500/30"
                        />
                        <input
                            name="dueDate"
                            type="date"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500/30 [color-scheme:dark]"
                        />
                        <select
                            name="priority"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500/30"
                        >
                            <option value="medium" className="bg-[#0B0F19]">Medium Priority</option>
                            <option value="high" className="bg-[#0B0F19]">High Priority</option>
                            <option value="low" className="bg-[#0B0F19]">Low Priority</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all disabled:opacity-50"
                    >
                        {loading ? "Adding..." : "Add Task"}
                    </button>
                </form>
            )}

            {/* Task List */}
            {filteredTasks.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-white/25 text-sm">
                        {filter === "all" ? "No tasks yet. Add your first task above." : `No ${filter} tasks.`}
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {filteredTasks.map((task) => {
                        const priority = priorityConfig[task.priority] || priorityConfig.medium;
                        const PriorityIcon = priority.icon;
                        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                        const isOverdue = dueDate && task.status === "pending" && dueDate < new Date();
                        const isCompleted = task.status === "completed";

                        return (
                            <div
                                key={task.id}
                                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${isCompleted
                                        ? "bg-white/[0.02] border-white/[0.04]"
                                        : isOverdue
                                            ? "bg-red-500/[0.04] border-red-500/[0.08]"
                                            : "bg-white/[0.04] border-white/[0.06] hover:border-white/[0.12]"
                                    }`}
                            >
                                {/* Checkbox */}
                                <button
                                    onClick={() => handleToggleStatus(task)}
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center border flex-shrink-0 transition-all ${isCompleted
                                            ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                                            : "bg-white/[0.04] border-white/[0.1] text-white/15 hover:border-cyan-500/30 hover:text-cyan-400"
                                        }`}
                                >
                                    {isCompleted ? <Check size={14} /> : <Circle size={14} />}
                                </button>

                                {/* Title */}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${isCompleted ? "text-white/30 line-through" : "text-white/80"}`}>
                                        {task.title}
                                    </p>
                                    {dueDate && (
                                        <p className={`text-[10px] mt-0.5 flex items-center gap-1 ${isOverdue ? "text-red-400" : "text-white/25"
                                            }`}>
                                            <Calendar size={10} />
                                            {dueDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                            {isOverdue && (
                                                <span className="flex items-center gap-0.5 ml-1">
                                                    <AlertTriangle size={9} /> Overdue
                                                </span>
                                            )}
                                        </p>
                                    )}
                                </div>

                                {/* Priority */}
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${priority.bg}`}>
                                    <PriorityIcon size={12} className={priority.color} />
                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${priority.color}`}>
                                        {task.priority}
                                    </span>
                                </div>

                                {/* Delete */}
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="p-1.5 rounded-lg text-white/15 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
