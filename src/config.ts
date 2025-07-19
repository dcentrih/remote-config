import type { ConfigurationOptions } from "./types";

class RemoteConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RemoteConfigError";
  }
}

export class RemoteConfiguration<U> {
  private constructor(private options: ConfigurationOptions<any, U>) {}

  static create<T, U>(
    options: ConfigurationOptions<T, U>
  ): RemoteConfiguration<U> {
    return new RemoteConfiguration<U>(options);
  }

  public async initialize(): Promise<U> {
    const config = await this.fetchConfig();
    return this.validateConfig(config);
  }

  private async fetchConfig(): Promise<any> {
    try {
      const response = await fetch(this.options.url);
      return await response.json();
    } catch {
      throw new RemoteConfigError("Failed to load remote config");
    }
  }

  private validateConfig(config: any): U {
    const validate = this.options.validate;
    if (validate) {
      if (typeof validate === "function") {
        return validate(config);
      }
      return validate.parse(config);
    }
    return config;
  }
}
