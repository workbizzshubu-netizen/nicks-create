"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    FolderKanban,
    DollarSign,
    CheckSquare,
    MessageSquare,
    LogOut,
    ChevronRight
} from "lucide-react";
import { signOut } from "next-auth/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
        { name: "Clients", icon: Users, href: "/admin/clients" },
        { name: "Projects", icon: FolderKanban, href: "/admin/projects" },
        { name: "Finance", icon: DollarSign, href: "/admin/finance" },
        { name: "Enquiries", icon: MessageSquare, href: "/admin/enquiries" },
    ];

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    return (
        <div className="w-72 h-screen flex flex-col border-r border-white/[0.06] bg-[#070a12]/80 backdrop-blur-3xl sticky top-0">
            {/* Branding */}
            <div className="p-8 pb-6">
                <h1 className="text-lg font-black tracking-tight text-white">
                    TBM<span className="text-cyan-400">.</span><span className="text-white/30 font-light">OS</span>
                </h1>
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 mt-1">
                    Client OS
                </p>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                {menuItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group",
                                active
                                    ? "bg-white/[0.08] text-white border border-white/[0.06]"
                                    : "text-white/35 hover:text-white/70 hover:bg-white/[0.03]"
                            )}
                        >
                            <div className="flex items-center gap-3.5">
                                <item.icon
                                    size={18}
                                    className={cn(
                                        "transition-colors duration-300",
                                        active ? "text-cyan-400" : "text-white/20 group-hover:text-white/40"
                                    )}
                                />
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
                                    {item.name}
                                </span>
                            </div>
                            {active && <ChevronRight size={12} className="text-white/15" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/[0.06]">
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center gap-3.5 px-4 py-3 w-full rounded-xl text-white/30 hover:text-red-400/80 hover:bg-red-500/[0.06] transition-all duration-300"
                >
                    <LogOut size={18} className="text-white/15" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em]">Logout</span>
                </button>
            </div>
        </div>
    );
};
