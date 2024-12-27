import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://day-of-the-dog.artechfuz3d.xyz/",
  integrations: [tailwind(), icon(), react(), ]
});