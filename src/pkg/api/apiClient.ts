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
