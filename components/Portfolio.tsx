"use client";

export default function Portfolio() {
    const videos = [
        "https://player.vimeo.com/video/1154597942",
        "https://player.vimeo.com/video/1154597904",
        "https://player.vimeo.com/video/1154597670",
        "https://player.vimeo.com/video/1154598785",
    ];

    return (
        <section
            id="portfolio"
            style={{
                padding: "80px 6%",
                background: "transparent",
                color: "white",
            }}
        >
            <h2 style={{ fontSize: 42, marginBottom: 40 }}>Portfolio</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 24,
                }}
            >
                {videos.map((src, i) => (
                    <div
                        key={i}
                        style={{
                            aspectRatio: "9 / 16",
                            borderRadius: 20,
                            overflow: "hidden",
                            background: "#000",
                        }}
                    >
                        <iframe
                            src={src}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
