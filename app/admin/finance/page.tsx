import { getFinanceData } from "@/lib/actions";
import { FinanceTable } from "@/components/admin/FinanceTable";

export default async function FinancePage() {
    const financeData = await getFinanceData();

    const totalRevenue = financeData.reduce((s, p) => s + p.totalAmount, 0);
    const totalAdvance = financeData.reduce((s, p) => s + p.advanceReceived, 0);
    const totalPending = financeData.reduce((s, p) => s + p.remaining, 0);
    const fullyPaidCount = financeData.filter(p => p.isFullyPaid).length;

    // Build unique billing month options for filter
    const months = Array.from(new Set(financeData.map(p => p.billingMonth).filter(Boolean))).sort().reverse();

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
            <div className="mb-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-3">
                    TBM Client OS / Money
                </p>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">Finance</h1>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">Total Revenue</p>
                    <h3 className="text-xl font-black tracking-tight text-white">₹{totalRevenue.toLocaleString("en-IN")}</h3>
                </div>
                <div className="p-5 rounded-2xl bg-cyan-500/[0.06] border border-cyan-500/[0.1]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60 mb-1">Advance Received</p>
                    <h3 className="text-xl font-black tracking-tight text-cyan-400">₹{totalAdvance.toLocaleString("en-IN")}</h3>
                </div>
                <div className="p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/[0.1]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/60 mb-1">Pending</p>
                    <h3 className="text-xl font-black tracking-tight text-amber-400">₹{totalPending.toLocaleString("en-IN")}</h3>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/[0.1]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/60 mb-1">Fully Paid</p>
                    <h3 className="text-xl font-black tracking-tight text-emerald-400">{fullyPaidCount} projects</h3>
                </div>
            </div>

            {/* Client-side table with filter */}
            <FinanceTable data={financeData} billingMonths={months} />
        </div>
    );
}
