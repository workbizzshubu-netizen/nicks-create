"use client";

import { useState } from "react";
import { markAsRead, deleteEnquiry } from "@/lib/actions";
import {
    CheckCircle,
    Trash2,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    MoreVertical
} from "lucide-react";

interface Enquiry {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    solution: string;
    createdAt: Date;
    read: boolean;
}

export const EnquiryList = ({ initialEnquiries }: { initialEnquiries: Enquiry[] }) => {
    const [enquiries, setEnquiries] = useState(initialEnquiries);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(enquiries.length / itemsPerPage);
    const currentItems = enquiries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleMarkRead = async (id: string) => {
        const res = await markAsRead(id);
        if (res.success) {
            setEnquiries(enquiries.map(e => e.id === id ? { ...e, read: true } : e));
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const res = await deleteEnquiry(id);
        if (res.success) {
            setEnquiries(enquiries.filter(e => e.id !== id));
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            <div className="rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-[10px] uppercase font-black tracking-widest text-white/40">
                                <th className="px-8 py-6">Sender</th>
                                <th className="px-8 py-6">Message Preview</th>
                                <th className="px-8 py-6">Date</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {currentItems.map((item) => (
                                <tr
                                    key={item.id}
                                    className={`group transition-colors ${item.read ? 'opacity-40' : 'opacity-100 hover:bg-white/[0.02]'}`}
                                >
                                    <td className="px-8 py-8">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-white">{item.name}</span>
                                            <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest">{item.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8 max-w-md">
    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed italic">
        {item.solution}
    </p>
    <p className="text-[10px] text-white/30 mt-1">
        {item.phoneNumber}
    </p>
</td>
                                    <td className="px-8 py-8">
                                        <span className="text-[10px] font-bold text-white/30 uppercase">
                                            {formatDate(item.createdAt)}
                                        </span>
                                    </td>
                                    <td className="px-8 py-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {!item.read && (
                                                <button
                                                    onClick={() => handleMarkRead(item.id)}
                                                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                                                    title="Mark as read"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-3 rounded-xl bg-white/5 hover:bg-red-500/10 transition-colors text-white/60 hover:text-red-500"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {enquiries.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-32 text-center text-white/20 font-black uppercase tracking-[0.5em]">
                                        No enquiries found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-8 py-4 rounded-3xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="p-2 rounded-xl bg-white/5 disabled:opacity-20 text-white transition-all hover:bg-white/10"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="p-2 rounded-xl bg-white/5 disabled:opacity-20 text-white transition-all hover:bg-white/10"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
