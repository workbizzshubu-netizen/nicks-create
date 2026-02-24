"use client";

import { X, Download } from "lucide-react";
import jsPDF from "jspdf";

interface Task {
    id: string;
    title: string;
    price: number;
    status: string;
}

interface InvoiceProject {
    id: string;
    title: string;
    billingMonth: string;
    advanceReceived: number;
    isFullyPaid: boolean;
    client: { id: string; name: string };
    tasks: Task[];
    createdAt: Date;
}

interface Props {
    project: InvoiceProject;
    totalAmount: number;
    remaining: number;
    onClose: () => void;
}

function formatBillingMonth(bm: string): string {
    if (!bm) return "—";
    const [y, m] = bm.split("-");
    const d = new Date(parseInt(y), parseInt(m) - 1, 1);
    return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export function InvoiceGeneratorV2({ project, totalAmount, remaining, onClose }: Props) {
    const paymentStatus = project.isFullyPaid
        ? "Fully Paid"
        : project.advanceReceived > 0
            ? "Partially Paid"
            : "Unpaid";

    function generatePDF() {
        const doc = new jsPDF();
        const pw = doc.internal.pageSize.getWidth();
        const ph = doc.internal.pageSize.getHeight();

        // ── Background ────────────────────────────────────
        doc.setFillColor(11, 15, 25);
        doc.rect(0, 0, pw, ph, "F");

        // ── Top accent bar ────────────────────────────────
        doc.setFillColor(34, 211, 238);
        doc.rect(0, 0, pw, 3.5, "F");

        // ── Brand ─────────────────────────────────────────
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text("TBM STUDIOZ", 20, 33);

        doc.setFontSize(7.5);
        doc.setTextColor(110, 115, 130);
        doc.text("CREATIVE AGENCY", 20, 41);

        // ── Invoice metadata (right) ──────────────────────
        doc.setFontSize(8.5);
        doc.setTextColor(34, 211, 238);
        doc.text(`INV-${project.id.slice(-6).toUpperCase()}`, pw - 20, 30, { align: "right" });

        doc.setFontSize(7.5);
        doc.setTextColor(100, 105, 120);
        doc.text(`Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, pw - 20, 39, { align: "right" });
        if (project.billingMonth) {
            doc.text(`Billing: ${formatBillingMonth(project.billingMonth)}`, pw - 20, 47, { align: "right" });
        }

        // ── Divider ───────────────────────────────────────
        doc.setDrawColor(35, 42, 62);
        doc.setLineWidth(0.4);
        doc.line(20, 53, pw - 20, 53);

        // ── Bill To / Project ─────────────────────────────
        let y = 67;
        doc.setFontSize(7);
        doc.setTextColor(100, 105, 120);
        doc.text("BILL TO", 20, y);
        doc.text("PROJECT", pw - 20, y, { align: "right" });

        y += 7;
        doc.setFontSize(13);
        doc.setTextColor(240, 240, 248);
        doc.text(project.client.name, 20, y);
        doc.text(project.title, pw - 20, y, { align: "right" });

        // ── Task Table header ─────────────────────────────
        y = 97;
        doc.setFillColor(18, 24, 40);
        doc.roundedRect(20, y - 5, pw - 40, 13, 2, 2, "F");
        doc.setFontSize(7.5);
        doc.setTextColor(34, 211, 238);
        doc.text("TASK DESCRIPTION", 28, y + 3);
        doc.text("AMOUNT", pw - 28, y + 3, { align: "right" });

        // ── Task rows ─────────────────────────────────────
        y += 16;
        project.tasks.forEach((task) => {
            doc.setFontSize(9.5);
            doc.setTextColor(200, 205, 215);
            doc.setFont("helvetica", "normal");
            doc.text(task.title, 28, y);
            doc.text(`₹${task.price.toLocaleString("en-IN")}`, pw - 28, y, { align: "right" });

            doc.setDrawColor(28, 35, 55);
            doc.setLineWidth(0.15);
            y += 5;
            doc.line(28, y, pw - 28, y);
            y += 8;
        });

        // ── Totals block ──────────────────────────────────
        y += 4;
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(240, 242, 248);
        doc.text("Project Total", 28, y);
        doc.text(`₹${totalAmount.toLocaleString("en-IN")}`, pw - 28, y, { align: "right" });

        y += 8;
        doc.setDrawColor(35, 42, 62);
        doc.setLineWidth(0.2);
        doc.line(28, y, pw - 28, y);

        y += 10;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(74, 222, 128);
        doc.text("Advance Received", 28, y);
        doc.text(`₹${project.advanceReceived.toLocaleString("en-IN")}`, pw - 28, y, { align: "right" });

        y += 8;
        doc.line(28, y, pw - 28, y);

        y += 10;
        const remR = remaining > 0 ? 251 : 74;
        const remG = remaining > 0 ? 191 : 222;
        const remB = remaining > 0 ? 36 : 128;
        doc.setFont("helvetica", "bold");
        doc.setTextColor(remR, remG, remB);
        doc.text("Balance Remaining", 28, y);
        doc.text(`₹${remaining.toLocaleString("en-IN")}`, pw - 28, y, { align: "right" });

        // ── Status badge ──────────────────────────────────
        y += 22;
        const bgC = project.isFullyPaid ? [20, 83, 45] : project.advanceReceived > 0 ? [78, 54, 5] : [80, 20, 20];
        const txC = project.isFullyPaid ? [74, 222, 128] : project.advanceReceived > 0 ? [251, 191, 36] : [248, 113, 113];
        doc.setFillColor(bgC[0], bgC[1], bgC[2]);
        const tw = doc.getTextWidth(paymentStatus.toUpperCase());
        doc.roundedRect(20, y - 5, tw + 22, 13, 3, 3, "F");
        doc.setFontSize(8);
        doc.setTextColor(txC[0], txC[1], txC[2]);
        doc.text(paymentStatus.toUpperCase(), 31, y + 3);

        // ── Footer ────────────────────────────────────────
        const fy = ph - 20;
        doc.setDrawColor(30, 37, 58);
        doc.line(20, fy - 8, pw - 20, fy - 8);
        doc.setFontSize(6.5);
        doc.setTextColor(65, 70, 90);
        doc.text(
            "TBM Studioz · Creative Agency · Computer generated invoice · Not a legal tax document",
            pw / 2, fy, { align: "center" }
        );

        doc.save(`TBM-Invoice-${project.title.replace(/\s+/g, "-")}-${project.billingMonth || new Date().getFullYear()}.pdf`);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4 rounded-2xl bg-[#0d1220] border border-white/[0.08] overflow-hidden shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                    <div>
                        <h2 className="text-base font-bold text-white">Invoice Preview</h2>
                        <p className="text-xs text-white/30 mt-0.5">{project.title} · {formatBillingMonth(project.billingMonth)}</p>
                    </div>
                    <button onClick={onClose}
                        className="p-2 rounded-lg text-white/25 hover:text-white hover:bg-white/10 transition-all">
                        <X size={16} />
                    </button>
                </div>

                {/* Summary rows */}
                <div className="p-6 space-y-3.5">
                    {[
                        { label: "Client", value: project.client.name, cls: "text-white" },
                        { label: "Project", value: project.title, cls: "text-white" },
                        { label: "Billing Month", value: formatBillingMonth(project.billingMonth), cls: "text-violet-400" },
                        { label: "Invoice #", value: `INV-${project.id.slice(-6).toUpperCase()}`, cls: "text-cyan-400" },
                        { label: "Date", value: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }), cls: "text-white/60" },
                    ].map(r => (
                        <div key={r.label} className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">{r.label}</span>
                            <span className={`text-sm font-semibold ${r.cls}`}>{r.value}</span>
                        </div>
                    ))}

                    <div className="h-px bg-white/[0.06] my-1" />

                    {/* Task breakdown */}
                    {project.tasks.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/20 mb-2">Tasks</p>
                            {project.tasks.map(t => (
                                <div key={t.id} className="flex justify-between items-center">
                                    <span className="text-xs text-white/50 truncate max-w-[60%]">{t.title}</span>
                                    <span className="text-xs font-bold text-white/60">₹{t.price.toLocaleString("en-IN")}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="h-px bg-white/[0.06] my-1" />

                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Total</span>
                        <span className="text-sm font-black text-white">₹{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/50">Advance</span>
                        <span className="text-sm font-bold text-emerald-400">₹{project.advanceReceived.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/50">Remaining</span>
                        <span className={`text-sm font-bold ${remaining > 0 ? "text-amber-400" : "text-emerald-400"}`}>
                            ₹{remaining.toLocaleString("en-IN")}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Status</span>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${project.isFullyPaid
                                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                                : project.advanceReceived > 0
                                    ? "bg-amber-500/15 text-amber-400 border-amber-500/20"
                                    : "bg-red-500/15 text-red-400 border-red-500/20"
                            }`}>{paymentStatus}</span>
                    </div>
                </div>

                {/* Download */}
                <div className="p-6 border-t border-white/[0.06]">
                    <button
                        onClick={generatePDF}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 active:scale-[0.98] transition-all"
                    >
                        <Download size={14} />
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
