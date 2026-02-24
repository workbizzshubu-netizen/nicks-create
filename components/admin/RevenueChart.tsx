"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
    data: { month: string; revenue: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#151a2b] border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
                    {label}
                </p>
                <p className="text-lg font-black text-white">
                    ₹{payload[0].value.toLocaleString("en-IN")}
                </p>
            </div>
        );
    }
    return null;
};

export function RevenueChart({ data }: RevenueChartProps) {
    const hasData = data.some((d) => d.revenue > 0);

    if (!hasData) {
        return (
            <div className="h-64 flex items-center justify-center">
                <p className="text-sm text-white/25">No revenue data yet</p>
            </div>
        );
    }

    return (
        <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.04)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="month"
                        tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10, fontWeight: 700 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#22d3ee"
                        strokeWidth={2}
                        fill="url(#revenueGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
