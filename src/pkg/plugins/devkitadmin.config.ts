import type { DevkitAdminConfig } from "@devkitvue/admin";
import { apiClient } from "../api/apiClient";

export const devkitAdminConfig: DevkitAdminConfig<typeof apiClient> = {
  apiClient,
  locales: ["en", "ar"],
  baseImageUrl: import.meta.env.VITE_BASE_IMAGE_URL,
  fallbackImageUrl: import.meta.env.VITE_FALLBACK_IMAGE_URL,
  fallbackImageSvg: "camera-off-line",
  authHandler: {
    login: "authLogin",
    allowedProviders: ["google"],
    redirectRoute: "/",
    providerLogin: {
      endpoint: "authLoginProvider",
      callbackEndpoint: "authLoginProviderCallback",
      callbackRoute: import.meta.env.VITE_PROVIDER_CALLBACK,
    },
    resetPassword: {
      endpoint: "authResetPassword",
      emailEndpoint: "authResetPasswordEmail",
      route: "/auth/reset-password",
      emailRedirectRoute: "/auth/login",
      emailRoute: "/auth/reset-password-email",
    },
  },
  filesHandler: {
    fileDelete: "fileDelete",
    galleryListEndpoint: "galleryList",
    fileUploadUrlFind: "fileUploadUrlFind",
    bucketList: "bucketList",
    fileDeleteByBucket: "fileDeleteByBucket",
    bucketCreateUpdate: "bucketCreateUpdate",
  },
  iconFindApi: "iconFind",
};
