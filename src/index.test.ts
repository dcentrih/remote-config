import { describe, expect, it, vi } from "vitest";
import { RemoteConfiguration } from "./config";
import * as z from "zod/v4-mini";

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

    const schema = z.object({
      name: z.string(),
      version: z.string(),
    });

    const remote = RemoteConfiguration.create({
      url: "https://example.com/config.json",
      validate: schema,
    });
    const config = await remote.initialize();
    expect(config).toEqual({
      name: "My App",
      version: "1.0.0",
    });
  });
});
