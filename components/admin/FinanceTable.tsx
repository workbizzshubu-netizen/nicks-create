"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, Filter } from "lucide-react";

interface FinanceRow {
    id: string;
    title: string;
    clientName: string;
    billingMonth: string;
    totalAmount: number;
    advanceReceived: number;
    remaining: number;
    isFullyPaid: boolean;
    status: string;
    createdAt: Date;
}

interface Props {
    data: FinanceRow[];
    billingMonths: string[];
}

function formatBillingMonth(bm: string): string {
    if (!bm) return "—";
    const [y, m] = bm.split("-");
    const d = new Date(parseInt(y), parseInt(m) - 1, 1);
    return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export function FinanceTable({ data, billingMonths }: Props) {
    const [filterMonth, setFilterMonth] = useState<string>("all");

    const filtered = filterMonth === "all"
        ? data
        : data.filter(p => p.billingMonth === filterMonth);

    return (
        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] overflow-hidden">

            {/* Toolbar */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06] flex-wrap">
                <div className="flex items-center gap-2 text-white/30">
                    <Filter size={13} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Filter</span>
                </div>
                <select
                    value={filterMonth}
                    onChange={e => setFilterMonth(e.target.value)}
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white/70 outline-none focus:border-cyan-500/40 min-w-[160px]"
                >
                    <option value="all">All Billing Months</option>
                    {billingMonths.map(m => (
                        <option key={m} value={m}>{formatBillingMonth(m)}</option>
                    ))}
                </select>

                <span className="ml-auto text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Table header */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px_40px] gap-4 px-6 py-3 border-b border-white/[0.05]">
                {["Client / Project", "Billing", "Total", "Advance", "Remaining", "Status", ""].map(h => (
                    <p key={h} className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/20">{h}</p>
                ))}
            </div>

            {/* Rows */}
            {filtered.length === 0 ? (
                <p className="text-sm text-white/20 py-16 text-center">
                    {filterMonth === "all" ? "No projects yet." : `No projects for ${formatBillingMonth(filterMonth)}.`}
                </p>
            ) : (
                <div className="divide-y divide-white/[0.04]">
                    {filtered.map((p) => (
                        <div key={p.id}
                            className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_80px_40px] gap-3 md:gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors">

                            {/* Client / Project */}
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-white/80 truncate">{p.title}</p>
                                <p className="text-xs text-white/30 mt-0.5">{p.clientName}</p>
                            </div>

                            {/* Billing Month */}
                            <p className="text-xs font-semibold text-violet-400/80">
                                {formatBillingMonth(p.billingMonth)}
                            </p>

                            {/* Total */}
                            <p className="text-sm font-bold text-white/70">
                                ₹{p.totalAmount.toLocaleString("en-IN")}
                            </p>

                            {/* Advance */}
                            <p className="text-sm font-bold text-cyan-400">
                                ₹{p.advanceReceived.toLocaleString("en-IN")}
                            </p>

                            {/* Remaining */}
                            <p className={`text-sm font-bold ${p.remaining > 0 ? "text-amber-400" : "text-emerald-400"}`}>
                                ₹{p.remaining.toLocaleString("en-IN")}
                            </p>

                            {/* Status */}
                            <div>
                                {p.isFullyPaid ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                                        <CheckCircle2 size={9} /> Paid
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/15">
                                        <Clock size={9} /> Pending
                                    </span>
                                )}
                            </div>

                            {/* Link */}
                            <Link href={`/admin/projects/${p.id}`}
                                className="p-1.5 rounded-lg text-white/20 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all w-fit">
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
