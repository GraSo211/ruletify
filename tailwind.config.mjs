/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            screens: {
                tablet:"700px",
                hd: "1200px",
                "full-hd": "1900px",
                "2k": "2500px",
            },
        },
    },
    plugins: [],
};
