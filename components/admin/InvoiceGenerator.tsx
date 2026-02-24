"use client";

import { X, Download } from "lucide-react";
import jsPDF from "jspdf";

interface Payment {
    id: string;
    amount: number;
    type: string;
    paid: boolean;
    createdAt: Date;
}

interface InvoiceProject {
    id: string;
    title: string;
    totalValue: number;
    client: { id: string; name: string };
    payments: Payment[];
    createdAt: Date;
}

interface InvoiceGeneratorProps {
    project: InvoiceProject;
    onClose: () => void;
}

export function InvoiceGenerator({ project, onClose }: InvoiceGeneratorProps) {
    const paidAmount = project.payments
        .filter((p) => p.paid)
        .reduce((sum, p) => sum + p.amount, 0);
    const remaining = Math.max(0, project.totalValue - paidAmount);
    const paymentStatus = remaining <= 0 ? "Fully Paid" : paidAmount > 0 ? "Partially Paid" : "Unpaid";

    function generatePDF() {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Background
        doc.setFillColor(11, 15, 25);
        doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), "F");

        // Header accent line
        doc.setFillColor(34, 211, 238); // cyan-400
        doc.rect(0, 0, pageWidth, 4, "F");

        // Brand
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont("helvetica", "bold");
        doc.text("TBM STUDIOZ", 20, 35);

        doc.setFontSize(9);
        doc.setTextColor(150, 150, 160);
        doc.text("CREATIVE AGENCY", 20, 43);

        // Invoice Title
        doc.setFontSize(10);
        doc.setTextColor(34, 211, 238);
        doc.text("INVOICE", pageWidth - 20, 30, { align: "right" });

        doc.setFontSize(8);
        doc.setTextColor(120, 120, 130);
        doc.text(`Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, pageWidth - 20, 38, { align: "right" });
        doc.text(`Invoice #: INV-${project.id.slice(-6).toUpperCase()}`, pageWidth - 20, 45, { align: "right" });

        // Divider
        doc.setDrawColor(255, 255, 255, 0.1);
        doc.setLineWidth(0.3);
        doc.line(20, 55, pageWidth - 20, 55);

        // Client Info
        let yPos = 70;
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 130);
        doc.text("BILL TO", 20, yPos);
        yPos += 8;
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255);
        doc.text(project.client.name, 20, yPos);

        // Project Info
        yPos = 70;
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 130);
        doc.text("PROJECT", pageWidth - 20, yPos, { align: "right" });
        yPos += 8;
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255);
        doc.text(project.title, pageWidth - 20, yPos, { align: "right" });

        // Table header
        yPos = 105;
        doc.setFillColor(20, 25, 40);
        doc.roundedRect(20, yPos - 5, pageWidth - 40, 14, 3, 3, "F");
        doc.setFontSize(8);
        doc.setTextColor(34, 211, 238);
        doc.text("DESCRIPTION", 28, yPos + 4);
        doc.text("AMOUNT", pageWidth - 28, yPos + 4, { align: "right" });

        // Table rows
        yPos += 22;
        doc.setTextColor(220, 220, 225);
        doc.setFontSize(10);
        doc.text("Total Project Value", 28, yPos);
        doc.text(`₹${project.totalValue.toLocaleString("en-IN")}`, pageWidth - 28, yPos, { align: "right" });

        // Divider
        yPos += 8;
        doc.setDrawColor(40, 45, 60);
        doc.setLineWidth(0.2);
        doc.line(28, yPos, pageWidth - 28, yPos);

        yPos += 12;
        doc.setTextColor(74, 222, 128); // emerald
        doc.text("Amount Paid", 28, yPos);
        doc.text(`₹${paidAmount.toLocaleString("en-IN")}`, pageWidth - 28, yPos, { align: "right" });

        yPos += 8;
        doc.setDrawColor(40, 45, 60);
        doc.line(28, yPos, pageWidth - 28, yPos);

        yPos += 12;
        const remColor = remaining > 0 ? [251, 191, 36] : [74, 222, 128]; // amber or green
        doc.setTextColor(remColor[0], remColor[1], remColor[2]);
        doc.setFont("helvetica", "bold");
        doc.text("Balance Remaining", 28, yPos);
        doc.text(`₹${remaining.toLocaleString("en-IN")}`, pageWidth - 28, yPos, { align: "right" });

        // Status Badge
        yPos += 25;
        const statusColor = remaining <= 0 ? [20, 83, 45] : paidAmount > 0 ? [78, 54, 5] : [80, 20, 20];
        const statusTextColor = remaining <= 0 ? [74, 222, 128] : paidAmount > 0 ? [251, 191, 36] : [248, 113, 113];
        doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
        const statusWidth = doc.getTextWidth(paymentStatus) + 20;
        doc.roundedRect(20, yPos - 5, statusWidth + 10, 14, 4, 4, "F");
        doc.setFontSize(9);
        doc.setTextColor(statusTextColor[0], statusTextColor[1], statusTextColor[2]);
        doc.text(paymentStatus.toUpperCase(), 30, yPos + 4);

        // Payment Details
        if (project.payments.length > 0) {
            yPos += 30;
            doc.setFontSize(8);
            doc.setTextColor(120, 120, 130);
            doc.text("PAYMENT HISTORY", 20, yPos);
            yPos += 10;

            project.payments.forEach((payment) => {
                const pDate = new Date(payment.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
                doc.setFontSize(9);
                doc.setTextColor(180, 180, 185);
                doc.text(`${payment.type.charAt(0).toUpperCase() + payment.type.slice(1)} — ${pDate}`, 28, yPos);
                doc.setTextColor(payment.paid ? 74 : 251, payment.paid ? 222 : 191, payment.paid ? 128 : 36);
                doc.text(`₹${payment.amount.toLocaleString("en-IN")} ${payment.paid ? "(Paid)" : "(Pending)"}`, pageWidth - 28, yPos, { align: "right" });
                yPos += 8;
            });
        }

        // Footer
        const footerY = doc.internal.pageSize.getHeight() - 25;
        doc.setDrawColor(40, 45, 60);
        doc.line(20, footerY - 10, pageWidth - 20, footerY - 10);
        doc.setFontSize(7);
        doc.setTextColor(80, 80, 90);
        doc.text("TBM Studioz • Creative Agency • This is a computer generated invoice", pageWidth / 2, footerY, { align: "center" });

        // Download
        doc.save(`TBM-Invoice-${project.title.replace(/\s+/g, "-")}.pdf`);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-lg mx-4 rounded-2xl bg-[#111827] border border-white/[0.08] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                    <div>
                        <h2 className="text-lg font-bold text-white">Invoice Preview</h2>
                        <p className="text-xs text-white/30 mt-0.5">{project.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Client</span>
                        <span className="text-sm text-white font-semibold">{project.client.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Total</span>
                        <span className="text-sm text-white font-semibold">₹{project.totalValue.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-emerald-400/60 font-bold uppercase tracking-widest">Paid</span>
                        <span className="text-sm text-emerald-400 font-semibold">₹{paidAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-amber-400/60 font-bold uppercase tracking-widest">Remaining</span>
                        <span className="text-sm text-amber-400 font-semibold">₹{remaining.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="h-px bg-white/[0.06]" />

                    <div className="flex justify-between items-center">
                        <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Status</span>
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${remaining <= 0
                                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                                : paidAmount > 0
                                    ? "bg-amber-500/15 text-amber-400 border-amber-500/20"
                                    : "bg-red-500/15 text-red-400 border-red-500/20"
                            }`}>
                            {paymentStatus}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Date</span>
                        <span className="text-sm text-white/60">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/[0.06]">
                    <button
                        onClick={generatePDF}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all"
                    >
                        <Download size={14} />
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
