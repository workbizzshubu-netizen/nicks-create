"use client";
import React from "react";

export default function GoldenWaveBackground() {
    return (
        <div className="rec-bg">
            {/* Molten vertical curtain */}
            <div className="rec-molten-columns" />

            {/* Scanning waves */}
            <div className="rec-scan-wave" />
            <div className="rec-scan-wave rec-scan-wave-2" />

            {/* Bottom fog */}
            <div className="rec-bottom-fog" />

            {/* Grid overlay */}
            <div className="rec-grid" />

            {/* Overlay for readability */}
            <div className="rec-overlay" />
        </div>
    );
}
