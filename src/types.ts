
export type ParseCallback<T, U> = (data: T) => U;

export interface ParseConfiguration<T, U> {
  parse: ParseCallback<T, U>;
}

export type ConfigurationOptions<T, U> = {
  url: string;
  validate?: ParseCallback<T, U> | ParseConfiguration<T, U>;
};