import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: "Wiki",
            logo: {
                src: "./src/assets/logo.svg",
                // replacesTitle: true,
            },
            social: {
                github: "https://github.com/tyr7z/zombsroyale",
            },
            sidebar: [
                {
                    label: "Main",
                    items: [{ label: "Zombs Royale", link: "/" }],
                },
                {
                    label: "Official Clients",
                    autogenerate: { directory: "clients" },
                },
                {
                    label: "Network",
                    autogenerate: { directory: "reference" },
                },
                {
                    label: "API",
                    autogenerate: { directory: "api" },
                },
                {
                    label: "Mason Service",
                    autogenerate: { directory: "mason" },
                },
                {
                    label: "Protocol",
                    autogenerate: { directory: "protocol" },
                },
                {
                    label: "Exploits",
                    autogenerate: { directory: "exploits" },
                },
                {
                    label: "Resources",
                    autogenerate: { directory: "resources" },
                },
                {
                    label: "Zombslib",
                    autogenerate: { directory: "zombslib" },
                },
            ],
        }),
    ],
});
