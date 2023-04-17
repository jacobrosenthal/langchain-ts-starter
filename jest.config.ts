import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["dist/"],
  setupFiles: ["dotenv/config"],
  testTimeout: 20_000,
};

export default config;
