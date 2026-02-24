import { getClients } from "@/lib/actions";
import { ClientList } from "@/components/admin/ClientList";

export default async function ClientsPage() {
    const clients = await getClients();

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
            <div className="mb-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-3">
                    TBM Client OS / People
                </p>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                    Clients
                </h1>
            </div>

            <ClientList initialClients={clients} />
        </div>
    );
}
