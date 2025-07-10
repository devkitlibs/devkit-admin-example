## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) with [pnpm](https://pnpm.io/)
- A running instance of **devkit-api**

### Installation

1. Install dependencies:
```bash
   pnpm install
```
2. Copy `.env.development.example` to `.env.development` and update the variables to match your environment. The file contains settings for the API URL and image storage:
```bash
VITE_FALLBACK_IMAGE_URL=http://localhost:54321/storage/v1/object/images/noimg.webp
VITE_BASE_IMAGE_URL=http://localhost:54321/storage/v1/object/public/
VITE_PROVIDER_CALLBACK=http://localhost:5174/auth/provider-login-callback
VITE_API_URL=http://localhost:9090
```
3. Start the development server:
```bash
   pnpm dev
```
   Additional scripts are available for building and previewing the project:
```json
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
```

## Project Structure

- **src/pkg/api/apiClient.ts** – defines the RPC client used across the app:
  ```ts
import { type Client, createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { DevkitService } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/devkit_service_pb";
import { AuthInterceptor } from "@devkitvue/apiclient";

const transport = createConnectTransport({
  baseUrl: import.meta.env.VITE_API_URL,
  fetch: (input, init) => {
    return fetch(input, {
      ...init,
      credentials: "include", // 👈 inject credentials here
    });
  },
  interceptors: [AuthInterceptor("token")],
  useHttpGet: true,
});

export const apiClient: Client<typeof DevkitService> = createClient(
  DevkitService,
  transport,
);
  ```
- **src/pkg/plugins/devkitadmin.config.ts** – configuration for the `@devkitvue/admin` plugin including authentication handlers and file management endpoints.
- **src/pkg/router** and **src/pkg/layouts** – main application router and layout components.
- **src/app** – feature modules (accounts, public files, etc.).

The application is bootstrapped in `src/main.ts` where plugins and global components are registered:
```ts
import { createApp } from "vue";
import "@/pkg/style/style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import "primeicons/primeicons.css";
import router from "@/pkg/router";
import DevkitAdminPlugin from "@devkitvue/admin";
import PrimeVue from "primevue/config";
import { ToastService, DialogService } from "primevue";
import { plugin as FormkitPlugin } from "@formkit/vue";
import { i18n } from "@/pkg/plugins/i18n.config";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { devkitAdminConfig } from "./pkg/plugins/devkitadmin.config";
import { tanstackOptions } from "./pkg/plugins/tanstack.config";
import { formkitConfig } from "./pkg/plugins/formkit.config";
import { AppBtn, AppIcon, AppImage } from "@devkitvue/base-components";

const app = createApp(App);

app.use(router);
const pinia = createPinia();
app.use(pinia);
app.use(FormkitPlugin, formkitConfig);
app.use(PrimeVue, { theme: "none" });
app.use(i18n);
app.use(ToastService);
app.use(DialogService);
app.use(VueQueryPlugin, tanstackOptions);
app.use(DevkitAdminPlugin, devkitAdminConfig);
app.component("AppBtn", AppBtn);
app.component("AppIcon", AppIcon);
app.component("AppImage", AppImage);
```

## Usage with devkit-api

Set `VITE_API_URL` in `.env.development` to point to your running devkit-api instance. All gRPC-Web calls are performed through the Connect client defined in `apiClient.ts`.

## Building for Production

Generate a production build:
```bash
pnpm build
```
Preview the built site locally:
```bash
pnpm preview
```

## License

This project is provided under the MIT License.
