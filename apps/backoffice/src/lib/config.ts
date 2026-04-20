export type AppProfile = "local" | "dev" | "qa" | "prod";

export const APP_PROFILE: AppProfile =
  (process.env.APP_PROFILE as AppProfile) ?? "local";

export const config = {
  isLocal: APP_PROFILE === "local",
  isDev: APP_PROFILE === "dev",
  isQa: APP_PROFILE === "qa",
  isProd: APP_PROFILE === "prod",

  useMockData: APP_PROFILE === "local",
  showDemoCredentials: APP_PROFILE === "local" || APP_PROFILE === "dev",
  enableDebugTools: APP_PROFILE !== "prod",

  defaultLowStockThreshold: 10,
} as const;
