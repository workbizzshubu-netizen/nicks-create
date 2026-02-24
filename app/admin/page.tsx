import {
    getDashboardStats,
    getRevenueData,
    getUpcomingDeadlines,
    getOverdueTasks,
} from "@/lib/actions";
import {
    Users,
    FolderKanban,
    DollarSign,
    AlertCircle,
    Clock,
    TrendingUp,
} from "lucide-react";
import { RevenueChart } from "@/components/admin/RevenueChart";

export default async function DashboardPage() {
    const stats = await getDashboardStats();
    const revenueData = await getRevenueData();
    const deadlines = await getUpcomingDeadlines();
    const overdueTasks = await getOverdueTasks();

    const statCards = [
        {
            label: "Active Clients",
            value: stats.activeClients,
            icon: Users,
            accent: "from-cyan-500/20 to-cyan-500/5",
            iconColor: "text-cyan-400",
        },
        {
            label: "Ongoing Projects",
            value: stats.ongoingProjects,
            icon: FolderKanban,
            accent: "from-violet-500/20 to-violet-500/5",
            iconColor: "text-violet-400",
        },
        {
            label: "Monthly Earnings",
            value: `₹${stats.monthlyEarnings.toLocaleString("en-IN")}`,
            icon: DollarSign,
            accent: "from-emerald-500/20 to-emerald-500/5",
            iconColor: "text-emerald-400",
        },
        {
            label: "Pending Payments",
            value: `₹${stats.totalPending.toLocaleString("en-IN")}`,
            icon: AlertCircle,
            accent: "from-amber-500/20 to-amber-500/5",
            iconColor: "text-amber-400",
        },
    ];

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-3">
                    TBM Client OS / Overview
                </p>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                    Dashboard
                </h1>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] group hover:border-white/[0.12] transition-all duration-500"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="relative z-10">
                            <div className={`w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4`}>
                                <card.icon size={18} className={card.iconColor} />
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35 mb-1">
                                {card.label}
                            </p>
                            <h3 className="text-2xl font-black tracking-tight text-white">
                                {card.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="mt-8 p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp size={18} className="text-cyan-400" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white/60">
                        Revenue Overview
                    </h2>
                </div>
                <RevenueChart data={revenueData} />
            </div>

            {/* Bottom Grid */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Upcoming Deadlines */}
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="flex items-center gap-3 mb-6">
                        <Clock size={18} className="text-violet-400" />
                        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white/60">
                            Upcoming Deadlines
                        </h2>
                    </div>
                    {deadlines.length === 0 ? (
                        <p className="text-sm text-white/25 py-8 text-center">No upcoming deadlines</p>
                    ) : (
                        <div className="space-y-3">
                            {deadlines.map((project) => {
                                const deadline = project.deadline ? new Date(project.deadline) : null;
                                const now = new Date();
                                const daysLeft = deadline
                                    ? Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                                    : null;
                                const isUrgent = daysLeft !== null && daysLeft <= 3;

                                return (
                                    <div
                                        key={project.id}
                                        className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]"
                                    >
                                        <div>
                                            <p className="text-sm font-semibold text-white/80">{project.title}</p>
                                            <p className="text-xs text-white/30 mt-0.5">{project.client.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-xs font-bold ${isUrgent ? "text-red-400" : "text-white/40"}`}>
                                                {daysLeft !== null
                                                    ? daysLeft < 0
                                                        ? `${Math.abs(daysLeft)}d overdue`
                                                        : daysLeft === 0
                                                            ? "Today"
                                                            : `${daysLeft}d left`
                                                    : "No deadline"}
                                            </p>
                                            {deadline && (
                                                <p className="text-[10px] text-white/20 mt-0.5">
                                                    {deadline.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Pending Tasks */}
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertCircle size={18} className="text-amber-400" />
                        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white/60">
                            Pending Tasks
                        </h2>
                    </div>
                    {overdueTasks.length === 0 ? (
                        <p className="text-sm text-white/25 py-8 text-center">No pending tasks 🎉</p>
                    ) : (
                        <div className="space-y-3">
                            {overdueTasks.map((task) => {

                                return (
                                    <div
                                        key={task.id}
                                        className="flex items-center justify-between p-4 rounded-xl bg-amber-500/[0.04] border border-amber-500/[0.08]"
                                    >
                                        <div>
                                            <p className="text-sm font-semibold text-white/80">{task.title}</p>
                                            <p className="text-xs text-white/30 mt-0.5">{task.project?.title}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">
                                                Pending
                                            </p>
                                            <p className="text-xs font-bold text-white/40 mt-0.5">
                                                ₹{task.price.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
