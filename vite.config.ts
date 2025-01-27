/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      include: [
        "src/components/modalWrapper/ModalWrapper.tsx",
        "src/components/loader/Loader.tsx",
        "src/components/filterSelection/FilterSection.tsx",
        "src/components/defaultInput/DefaultInput.tsx",
        "src/components/button/Button.tsx",
        "src/components/accessDenied/AccessDenied.tsx",
        "src/features/products/ProductsFilters.tsx",
        "src/features/products/ProductList.tsx"
      ]
    }
  }
});
