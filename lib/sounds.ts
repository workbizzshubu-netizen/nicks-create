// ─────────────────────────────────────────────────
// Web Audio API Sound Effects (no external files)
// ─────────────────────────────────────────────────

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
}

/**
 * Enquiry notification — a clean two-tone chime
 */
export function playEnquirySound() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // First note (higher pitch)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(880, now); // A5
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.3);

        // Second note (even higher, slight delay)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1174.66, now + 0.15); // D6
        gain2.gain.setValueAtTime(0, now);
        gain2.gain.setValueAtTime(0.3, now + 0.15);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.15);
        osc2.stop(now + 0.5);

        // Third note (highest, resolution)
        const osc3 = ctx.createOscillator();
        const gain3 = ctx.createGain();
        osc3.type = "sine";
        osc3.frequency.setValueAtTime(1318.51, now + 0.3); // E6
        gain3.gain.setValueAtTime(0, now);
        gain3.gain.setValueAtTime(0.25, now + 0.3);
        gain3.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
        osc3.connect(gain3);
        gain3.connect(ctx.destination);
        osc3.start(now + 0.3);
        osc3.stop(now + 0.7);
    } catch (e) {
        console.warn("Could not play enquiry sound:", e);
    }
}

/**
 * Full payment celebration — a rich ascending cash register cha-ching
 */
export function playPaymentSound() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // Metallic "cha" — noise burst
        const bufferSize = ctx.sampleRate * 0.08;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            noiseData[i] = (Math.random() * 2 - 1) * 0.3;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.2, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "highpass";
        noiseFilter.frequency.setValueAtTime(8000, now);
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(now);
        noise.stop(now + 0.08);

        // "Ching" — ascending bell tones
        const notes = [
            { freq: 1046.50, time: 0.06, dur: 0.4 },  // C6
            { freq: 1318.51, time: 0.12, dur: 0.4 },  // E6
            { freq: 1567.98, time: 0.18, dur: 0.5 },  // G6
            { freq: 2093.00, time: 0.28, dur: 0.6 },  // C7
        ];

        notes.forEach(({ freq, time, dur }) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, now + time);
            gain.gain.setValueAtTime(0.25, now + time);
            gain.gain.exponentialRampToValueAtTime(0.01, now + time + dur);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + time);
            osc.stop(now + time + dur);
        });

        // Shimmer overtone
        const shimmer = ctx.createOscillator();
        const shimmerGain = ctx.createGain();
        shimmer.type = "sine";
        shimmer.frequency.setValueAtTime(4186, now + 0.3); // C8
        shimmerGain.gain.setValueAtTime(0.08, now + 0.3);
        shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
        shimmer.connect(shimmerGain);
        shimmerGain.connect(ctx.destination);
        shimmer.start(now + 0.3);
        shimmer.stop(now + 1.0);
    } catch (e) {
        console.warn("Could not play payment sound:", e);
    }
}
