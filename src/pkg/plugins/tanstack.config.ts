import { QueryClient, type VueQueryPluginOptions } from "@tanstack/vue-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
export const tanstackOptions: VueQueryPluginOptions = { queryClient };
