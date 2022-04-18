interface LogisticFunctionOptions {
  l?: number;
  offset?: number;
  k: number;
  x0: number;
}
export const logisticFunction =
  ({ l = 1, offset = 0, k = 1, x0 = 0 }: LogisticFunctionOptions) =>
  (x: number) =>
    l / (1 + Math.exp(-k * (x - x0))) + offset;
