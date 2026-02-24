"use client";

import { useState } from "react";
import { createClient, updateClient, deleteClient } from "@/lib/actions";
import { useRouter } from "next/navigation";
import {
    Plus,
    X,
    Trash2,
    Edit3,
    Building2,
    Phone,
    Mail,
    MoreVertical,
} from "lucide-react";

interface Client {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    status: string;
    notes: string;
    createdAt: Date;
    projects: any[];
}

export function ClientList({ initialClients }: { initialClients: Client[] }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const statusColors: Record<string, string> = {
        active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
        completed: "bg-blue-500/15 text-blue-400 border-blue-500/20",
        hold: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    };

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        await createClient({
            name: fd.get("name") as string,
            email: (fd.get("email") as string) || undefined,
            phone: (fd.get("phone") as string) || undefined,
            company: (fd.get("company") as string) || undefined,
            notes: (fd.get("notes") as string) || undefined,
        });
        setLoading(false);
        setShowForm(false);
        router.refresh();
    }

    async function handleStatusChange(id: string, status: string) {
        await updateClient(id, { status });
        router.refresh();
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this client and all their projects?")) return;
        await deleteClient(id);
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
                    {showForm ? "Cancel" : "Add Client"}
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <form
                    onSubmit={handleCreate}
                    className="mb-8 p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="name"
                            placeholder="Client Name *"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-cyan-500/30"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-cyan-500/30"
                        />
                        <input
                            name="phone"
                            placeholder="Phone"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-cyan-500/30"
                        />
                        <input
                            name="company"
                            placeholder="Company"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-cyan-500/30"
                        />
                    </div>
                    <textarea
                        name="notes"
                        placeholder="Notes"
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-cyan-500/30 resize-none"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Client"}
                    </button>
                </form>
            )}

            {/* Client Cards */}
            {initialClients.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-white/25 text-sm">No clients yet. Add your first client above.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {initialClients.map((client) => (
                        <div
                            key={client.id}
                            className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-base font-bold text-white">{client.name}</h3>
                                    {client.company && (
                                        <p className="text-xs text-white/30 mt-0.5 flex items-center gap-1.5">
                                            <Building2 size={11} />
                                            {client.company}
                                        </p>
                                    )}
                                </div>
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${statusColors[client.status] || statusColors.active}`}>
                                    {client.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                {client.email && (
                                    <p className="text-xs text-white/40 flex items-center gap-2">
                                        <Mail size={12} className="text-white/20" />
                                        {client.email}
                                    </p>
                                )}
                                {client.phone && (
                                    <p className="text-xs text-white/40 flex items-center gap-2">
                                        <Phone size={12} className="text-white/20" />
                                        {client.phone}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                                <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                                    {client.projects.length} project{client.projects.length !== 1 ? "s" : ""}
                                </p>
                                <div className="flex items-center gap-1">
                                    <select
                                        value={client.status}
                                        onChange={(e) => handleStatusChange(client.id, e.target.value)}
                                        className="text-[10px] bg-transparent border border-white/[0.08] rounded-lg px-2 py-1 text-white/40 focus:outline-none cursor-pointer"
                                    >
                                        <option value="active" className="bg-[#0B0F19]">Active</option>
                                        <option value="completed" className="bg-[#0B0F19]">Completed</option>
                                        <option value="hold" className="bg-[#0B0F19]">Hold</option>
                                    </select>
                                    <button
                                        onClick={() => handleDelete(client.id)}
                                        className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
