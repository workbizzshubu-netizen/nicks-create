import { getProjects, getClients } from "@/lib/actions";
import { ProjectList } from "@/components/admin/ProjectList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    const [projects, clients] = await Promise.all([getProjects(), getClients()]);

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
            <div className="mb-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-3">
                    TBM Client OS / Work
                </p>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">Projects</h1>
            </div>

            <ProjectList initialProjects={projects} clients={clients} />
        </div>
    );
}
