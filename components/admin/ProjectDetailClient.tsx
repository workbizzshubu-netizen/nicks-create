"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    CheckCircle2, Circle, Trash2, Plus, Loader2,
    CheckCheck, RotateCcw, Edit3, X, Check
} from "lucide-react";
import {
    toggleProjectFullyPaid,
    createTask,
    updateTask,
    deleteTask,
    updateProject,
} from "@/lib/actions";
import { InvoiceGeneratorV2 } from "./InvoiceGeneratorV2";
import { playPaymentSound } from "@/lib/sounds";

interface Task {
    id: string;
    title: string;
    price: number;
    status: string;
    projectId: string;
    createdAt: Date;
}

interface Project {
    id: string;
    title: string;
    billingMonth: string;
    advanceReceived: number;
    isFullyPaid: boolean;
    status: string;
    client: { id: string; name: string };
    tasks: Task[];
    createdAt: Date;
    deadline: Date | null;
}

interface Props {
    project: Project;
}

export function ProjectDetailClient({ project }: Props) {
    const router = useRouter();
    const [, startTransition] = useTransition();

    // ── Finance state ──────────────────────────────────────
    const [advanceInput, setAdvanceInput] = useState(project.advanceReceived.toString());
    const [editingAdvance, setEditingAdvance] = useState(false);
    const [advanceSaving, setAdvanceSaving] = useState(false);
    const [fullyPaidLoading, setFullyPaidLoading] = useState(false);

    // ── Task form state ────────────────────────────────────
    const [showAddTask, setShowAddTask] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskPrice, setTaskPrice] = useState("");
    const [addingTask, setAddingTask] = useState(false);

    // ── Inline task editing ────────────────────────────────
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editPrice, setEditPrice] = useState("");

    // ── Invoice ────────────────────────────────────────────
    const [showInvoice, setShowInvoice] = useState(false);

    // ── Derived values ─────────────────────────────────────
    const totalAmount = project.tasks.reduce((s, t) => s + t.price, 0);
    const remaining = project.isFullyPaid ? 0 : Math.max(0, totalAmount - project.advanceReceived);
    const pendingTasks = project.tasks.filter(t => t.status === "pending");
    const completedTasks = project.tasks.filter(t => t.status === "completed");

    // ── Toggle Fully Paid ──────────────────────────────────
    async function handleToggleFullyPaid() {
        setFullyPaidLoading(true);
        const newValue = !project.isFullyPaid;
        await toggleProjectFullyPaid(project.id, newValue);
        if (newValue) playPaymentSound();
        setFullyPaidLoading(false);
        router.refresh();
    }

    // ── Save Advance ───────────────────────────────────────
    async function handleSaveAdvance() {
        const val = parseFloat(advanceInput);
        if (isNaN(val) || val < 0) return;
        setAdvanceSaving(true);
        await updateProject(project.id, { advanceReceived: val });
        setEditingAdvance(false);
        setAdvanceSaving(false);
        router.refresh();
    }

    // ── Add Task ───────────────────────────────────────────
    async function handleAddTask(e: React.FormEvent) {
        e.preventDefault();
        if (!taskTitle.trim()) return;
        setAddingTask(true);
        await createTask({
            title: taskTitle.trim(),
            price: parseFloat(taskPrice) || 0,
            projectId: project.id,
        });
        setTaskTitle("");
        setTaskPrice("");
        setShowAddTask(false);
        setAddingTask(false);
        router.refresh();
    }

    // ── Toggle Task Status ─────────────────────────────────
    async function handleToggleTask(task: Task) {
        await updateTask(task.id, {
            status: task.status === "completed" ? "pending" : "completed",
        });
        router.refresh();
    }

    // ── Save task inline edit ──────────────────────────────
    async function handleSaveTaskEdit(taskId: string) {
        if (!editTitle.trim()) return;
        startTransition(async () => {
            await updateTask(taskId, {
                title: editTitle.trim(),
                price: parseFloat(editPrice) || 0,
            });
            setEditingTaskId(null);
            router.refresh();
        });
    }

    // ── Delete Task ────────────────────────────────────────
    async function handleDeleteTask(taskId: string) {
        await deleteTask(taskId);
        router.refresh();
    }

    function startEdit(task: Task) {
        setEditingTaskId(task.id);
        setEditTitle(task.title);
        setEditPrice(task.price.toString());
    }

    return (
        <div className="space-y-5">

            {/* ── Finance Panel ─────────────────────────────── */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] space-y-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">Finance</p>

                {/* Summary row */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: "Total", value: `₹${totalAmount.toLocaleString("en-IN")}`, color: "text-white" },
                        { label: "Advance", value: `₹${project.advanceReceived.toLocaleString("en-IN")}`, color: "text-cyan-400" },
                        { label: "Remaining", value: `₹${remaining.toLocaleString("en-IN")}`, color: remaining > 0 ? "text-amber-400" : "text-emerald-400" },
                    ].map(s => (
                        <div key={s.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-1.5">{s.label}</p>
                            <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Advance edit */}
                <div className="flex items-center justify-between gap-4 pt-1">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-1">Advance Received</p>
                        {editingAdvance ? (
                            <div className="flex items-center gap-2">
                                <span className="text-white/40 text-sm">₹</span>
                                <input
                                    type="number"
                                    value={advanceInput}
                                    onChange={e => setAdvanceInput(e.target.value)}
                                    className="w-32 bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-cyan-500/40"
                                    autoFocus
                                />
                                <button
                                    onClick={handleSaveAdvance}
                                    disabled={advanceSaving}
                                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider hover:bg-cyan-500/30 transition-all disabled:opacity-50"
                                >
                                    {advanceSaving ? <Loader2 size={11} className="animate-spin" /> : "Save"}
                                </button>
                                <button onClick={() => { setEditingAdvance(false); setAdvanceInput(project.advanceReceived.toString()); }}
                                    className="text-white/25 text-[10px] font-bold uppercase hover:text-white/50 transition-colors">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setEditingAdvance(true)}
                                className="flex items-center gap-2 text-lg font-black text-cyan-400 hover:text-cyan-300 transition-colors group">
                                ₹{project.advanceReceived.toLocaleString("en-IN")}
                                <Edit3 size={11} className="text-white/20 group-hover:text-white/50 transition-colors" />
                            </button>
                        )}
                    </div>

                    {/* Fully Paid toggle */}
                    <button
                        onClick={handleToggleFullyPaid}
                        disabled={fullyPaidLoading}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${project.isFullyPaid
                                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/25"
                                : "bg-white/[0.04] text-white/40 border-white/[0.08] hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/20"
                            }`}
                    >
                        {fullyPaidLoading
                            ? <Loader2 size={13} className="animate-spin" />
                            : project.isFullyPaid
                                ? <><CheckCheck size={13} /> Fully Paid</>
                                : <><CheckCircle2 size={13} /> Mark Paid</>
                        }
                    </button>
                </div>

                {project.isFullyPaid && (
                    <button onClick={handleToggleFullyPaid}
                        className="flex items-center gap-1.5 text-[10px] text-white/15 hover:text-white/35 transition-colors">
                        <RotateCcw size={9} /> Undo — revert to ongoing
                    </button>
                )}
            </div>

            {/* ── Task List ─────────────────────────────────── */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
                            Tasks
                            <span className="ml-2 text-white/15">
                                {completedTasks.length}/{project.tasks.length} done
                            </span>
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddTask(v => !v)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/40 text-[10px] font-bold uppercase tracking-wider hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 transition-all"
                    >
                        {showAddTask ? <X size={11} /> : <Plus size={11} />}
                        {showAddTask ? "Cancel" : "Add Task"}
                    </button>
                </div>

                {/* Add Task form */}
                {showAddTask && (
                    <form onSubmit={handleAddTask} className="mb-5 p-4 rounded-xl bg-white/[0.03] border border-dashed border-white/[0.08] space-y-3">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Task description…"
                                value={taskTitle}
                                onChange={e => setTaskTitle(e.target.value)}
                                className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500/40 placeholder-white/20"
                                autoFocus
                            />
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-white/30 text-sm pointer-events-none">₹</span>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    min="0"
                                    value={taskPrice}
                                    onChange={e => setTaskPrice(e.target.value)}
                                    className="w-28 bg-white/[0.05] border border-white/[0.08] rounded-xl pl-7 pr-3 py-2.5 text-white text-sm outline-none focus:border-cyan-500/40 placeholder-white/20"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={addingTask || !taskTitle.trim()}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider hover:bg-cyan-500/30 transition-all disabled:opacity-40"
                            >
                                {addingTask ? <Loader2 size={11} className="animate-spin" /> : <Plus size={11} />}
                                Add
                            </button>
                        </div>
                    </form>
                )}

                {project.tasks.length === 0 && (
                    <p className="text-sm text-white/20 py-10 text-center">
                        No tasks yet. Add tasks to calculate the project total.
                    </p>
                )}

                {/* Pending tasks */}
                {pendingTasks.length > 0 && (
                    <div className="space-y-2">
                        {pendingTasks.map(task => (
                            <TaskRow
                                key={task.id}
                                task={task}
                                isEditing={editingTaskId === task.id}
                                editTitle={editTitle}
                                editPrice={editPrice}
                                onEditTitleChange={setEditTitle}
                                onEditPriceChange={setEditPrice}
                                onToggle={() => handleToggleTask(task)}
                                onDelete={() => handleDeleteTask(task.id)}
                                onStartEdit={() => startEdit(task)}
                                onSaveEdit={() => handleSaveTaskEdit(task.id)}
                                onCancelEdit={() => setEditingTaskId(null)}
                            />
                        ))}
                    </div>
                )}

                {/* Completed tasks */}
                {completedTasks.length > 0 && (
                    <div className="mt-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/15 mb-2.5">
                            Completed ({completedTasks.length})
                        </p>
                        <div className="space-y-2">
                            {completedTasks.map(task => (
                                <TaskRow
                                    key={task.id}
                                    task={task}
                                    isEditing={false}
                                    editTitle={editTitle}
                                    editPrice={editPrice}
                                    onEditTitleChange={setEditTitle}
                                    onEditPriceChange={setEditPrice}
                                    onToggle={() => handleToggleTask(task)}
                                    onDelete={() => handleDeleteTask(task.id)}
                                    onStartEdit={() => startEdit(task)}
                                    onSaveEdit={() => handleSaveTaskEdit(task.id)}
                                    onCancelEdit={() => setEditingTaskId(null)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Total row */}
                {project.tasks.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/30">Project Total</span>
                        <span className="text-lg font-black text-white">
                            ₹{totalAmount.toLocaleString("en-IN")}
                        </span>
                    </div>
                )}
            </div>

            {/* ── Invoice Button ────────────────────────────── */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowInvoice(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/40 text-xs font-bold uppercase tracking-wider hover:bg-violet-500/10 hover:text-violet-400 hover:border-violet-500/20 transition-all"
                >
                    Generate Invoice
                </button>
            </div>

            {showInvoice && (
                <InvoiceGeneratorV2
                    project={{
                        id: project.id,
                        title: project.title,
                        billingMonth: project.billingMonth,
                        advanceReceived: project.advanceReceived,
                        isFullyPaid: project.isFullyPaid,
                        client: project.client,
                        tasks: project.tasks,
                        createdAt: project.createdAt,
                    }}
                    totalAmount={totalAmount}
                    remaining={remaining}
                    onClose={() => setShowInvoice(false)}
                />
            )}
        </div>
    );
}

// ── Task Row ───────────────────────────────────────────────────────────────

interface TaskRowProps {
    task: Task;
    isEditing: boolean;
    editTitle: string;
    editPrice: string;
    onEditTitleChange: (v: string) => void;
    onEditPriceChange: (v: string) => void;
    onToggle: () => void;
    onDelete: () => void;
    onStartEdit: () => void;
    onSaveEdit: () => void;
    onCancelEdit: () => void;
}

function TaskRow({
    task, isEditing, editTitle, editPrice,
    onEditTitleChange, onEditPriceChange,
    onToggle, onDelete, onStartEdit, onSaveEdit, onCancelEdit,
}: TaskRowProps) {
    const done = task.status === "completed";

    if (isEditing) {
        return (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-cyan-500/[0.05] border border-cyan-500/20">
                <input
                    type="text"
                    value={editTitle}
                    onChange={e => onEditTitleChange(e.target.value)}
                    className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-1.5 text-white text-sm outline-none focus:border-cyan-500/40"
                    autoFocus
                />
                <div className="relative flex items-center">
                    <span className="absolute left-2.5 text-white/30 text-xs pointer-events-none">₹</span>
                    <input
                        type="number"
                        value={editPrice}
                        onChange={e => onEditPriceChange(e.target.value)}
                        className="w-24 bg-white/[0.05] border border-white/[0.1] rounded-lg pl-6 pr-2 py-1.5 text-white text-sm outline-none focus:border-cyan-500/40"
                    />
                </div>
                <button onClick={onSaveEdit} className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all">
                    <Check size={13} />
                </button>
                <button onClick={onCancelEdit} className="p-1.5 rounded-lg text-white/25 hover:text-white/60 transition-colors">
                    <X size={13} />
                </button>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-3 p-3.5 rounded-xl group transition-all border ${done
                ? "bg-white/[0.01] border-white/[0.03] opacity-50"
                : "bg-white/[0.03] border-white/[0.05] hover:border-white/[0.08]"
            }`}>
            <button onClick={onToggle}
                className={`flex-shrink-0 transition-colors ${done ? "text-emerald-400" : "text-white/20 hover:text-white/50"}`}>
                {done ? <CheckCircle2 size={17} /> : <Circle size={17} />}
            </button>

            <p className={`flex-1 text-sm font-medium ${done ? "line-through text-white/25" : "text-white/80"}`}>
                {task.title}
            </p>

            <span className={`text-sm font-bold flex-shrink-0 ${done ? "text-white/25" : "text-white/60"}`}>
                ₹{task.price.toLocaleString("en-IN")}
            </span>

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-all">
                <button onClick={onStartEdit}
                    className="p-1.5 rounded-lg text-white/20 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                    <Edit3 size={12} />
                </button>
                <button onClick={onDelete}
                    className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 size={12} />
                </button>
            </div>
        </div>
    );
}
