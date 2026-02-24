"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid credentials");
            setLoading(false);
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full p-12 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-3xl"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
                        Admin <span className="text-white/20 italic font-serif">Access</span>
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full h-16 px-8 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-white/20 transition-all text-sm font-bold tracking-widest text-white"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-16 px-8 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-white/20 transition-all text-sm font-bold tracking-[0.5em] text-white"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-center text-red-500/80 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {loading ? "Authenticating..." : "Enter Terminal"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
