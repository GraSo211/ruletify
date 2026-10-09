/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                night: {
                    900: "#080a10",
                    800: "#0d1018",
                    700: "#131724",
                    600: "#1a1f2e",
                    500: "#232a3d",
                },
                accent: {
                    pink: "#ff2e7d",
                    violet: "#8b5cf6",
                    cyan: "#22d3ee",
                    amber: "#f59e0b",
                    emerald: "#10b981",
                },
                muted: "#94a3b8",
            },
            fontFamily: {
                display: ['"Bebas Neue"', "cursive"],
                body: ['"Space Grotesk"', "sans-serif"],
            },
            boxShadow: {
                "glow-pink": "0 0 30px rgba(255, 46, 125, 0.35)",
                "glow-violet": "0 0 30px rgba(139, 92, 246, 0.35)",
                "glow-cyan": "0 0 30px rgba(34, 211, 238, 0.35)",
                "glow-amber": "0 0 30px rgba(245, 158, 11, 0.35)",
                "inner-glow": "inset 0 0 40px rgba(255, 255, 255, 0.03)",
            },
            animation: {
                "spin-slow": "spin 12s linear infinite",
                "float": "float 6s ease-in-out infinite",
                "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
                "shimmer": "shimmer 2.5s linear infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(255, 46, 125, 0.25)" },
                    "50%": { boxShadow: "0 0 45px rgba(255, 46, 125, 0.55)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
        },
    },
    plugins: [],
};
