import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: "Docs",
            social: {
                github: "https://github.com/tyr7z/zombsroyale",
            },
            sidebar: [
                {
                    label: "Main",
                    items: [{ label: "Zombs Royale", link: "/" }],
                },
                {
                    label: "Platforms",
                    autogenerate: { directory: "platforms" },
                },
                {
                    label: "Ingame",
                    autogenerate: { directory: "ingame" },
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
                    label: "Resources",
                    autogenerate: { directory: "resources" },
                },
            ],
        }),
    ],
});
