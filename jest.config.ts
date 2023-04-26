import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["dist/"],
  setupFiles: ["dotenv/config"],
  testTimeout: 20_000,
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    uuid: require.resolve("uuid"),
  },
  transform: {
    "^.+\\.m?[tj]sx?$": ["ts-jest", { useESM: true }],
  },
};

export default config;
