"use client";

import { useEffect, useState, useRef } from "react";
import { playEnquirySound } from "@/lib/sounds";

export function EnquiryPoller({ initialUnread }: { initialUnread: number }) {
    const [unreadCount, setUnreadCount] = useState(initialUnread);
    const prevCount = useRef(initialUnread);
    const hasInteracted = useRef(false);

    // Track user interaction (Web Audio API requirement)
    useEffect(() => {
        const mark = () => { hasInteracted.current = true; };
        window.addEventListener("click", mark, { once: true });
        window.addEventListener("keydown", mark, { once: true });
        return () => {
            window.removeEventListener("click", mark);
            window.removeEventListener("keydown", mark);
        };
    }, []);

    // Request browser notification permission
    useEffect(() => {
        if (typeof Notification !== "undefined" && Notification.permission === "default") {
            Notification.requestPermission();
        }
    }, []);

    // Poll every 15 seconds for new enquiries
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch("/api/admin/enquiries/count");
                if (res.ok) {
                    const data = await res.json();
                    setUnreadCount(data.unread);
                }
            } catch {
                // silent fail
            }
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    // Play sound when count increases
    useEffect(() => {
        if (unreadCount > prevCount.current && hasInteracted.current) {
            playEnquirySound();

            // Browser notification
            if (typeof Notification !== "undefined" && Notification.permission === "granted") {
                new Notification("🔔 New Enquiry!", {
                    body: "A new client enquiry just came in.",
                    icon: "/icon.jpg",
                });
            }
        }
        prevCount.current = unreadCount;
    }, [unreadCount]);

    return null; // Invisible — only handles polling + sound
}
