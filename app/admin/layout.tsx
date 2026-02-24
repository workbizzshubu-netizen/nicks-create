import { Sidebar } from "@/components/admin/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SessionProvider } from "@/components/SessionProvider";
import { EnquiryPoller } from "@/components/admin/EnquiryNotifier";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // Get initial unread count for the poller
    let initialUnread = 0;
    if (session) {
        try {
            initialUnread = await prisma.enquiry.count({ where: { read: false } });
        } catch { }
    }

    return (
        <SessionProvider>
            <div className="min-h-screen bg-[#0B0F19] text-white relative">
                {/* Ambient Glow */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/[0.03] blur-[150px] rounded-full" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/[0.02] blur-[150px] rounded-full" />
                </div>

                <div className="flex relative z-10 min-h-screen">
                    {session && <Sidebar />}
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </div>

                {/* Sound Notifications */}
                {session && <EnquiryPoller initialUnread={initialUnread} />}
            </div>
        </SessionProvider>
    );
}
