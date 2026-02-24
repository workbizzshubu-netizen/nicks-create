import { getEnquiries } from "@/lib/actions";
import { EnquiryList } from "@/components/admin/EnquiryList";

export default async function EnquiriesPage() {
    const enquiries = await getEnquiries();

    return (
        <div className="p-12 max-w-7xl mx-auto">
            <div className="mb-16">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-4">
                    Client Outreach / Incoming Data
                </h2>
                <h1 className="text-6xl font-black tracking-tighter text-white uppercase">
                    Enquiry <span className="text-white/20 italic font-serif">Vault</span>
                </h1>
            </div>

            <EnquiryList initialEnquiries={enquiries} />
        </div>
    );
}
