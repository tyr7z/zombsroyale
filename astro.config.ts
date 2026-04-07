import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
    image: {
        service: {
            entrypoint: "astro/assets/services/noop",
        },
    },
    integrations: [
        starlight({
            title: "Wiki",
            logo: {
                src: "./src/assets/logo.svg",
            },
            social: [
                { icon: "github", label: "GitHub", href: "https://github.com/tyr7z/zombsroyale" },
            ],
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
