import { describe, expect, it, vi } from "vitest";
import { RemoteConfiguration } from "./config";

describe("initializeRemoteConfig", () => {
  it("should initialize remote config", async () => {
    const mockJson = {
      name: "My App",
      version: "1.0.0",
    };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockJson,
    });

    const remote = RemoteConfiguration.create({
      url: "https://example.com/config.json",
      validate: (data) => {
        return data as {
          name: string;
          version: string;
        };
      },
    });
    const config = await remote.initialize();
    expect(config).toEqual({
      name: "My App",
      version: "1.0.0",
    });
  });
});
