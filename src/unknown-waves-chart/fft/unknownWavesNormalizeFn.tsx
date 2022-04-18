import { logisticFunction } from './logisticFunction';

const unknownWavesLogisticFunction = logisticFunction({ l: 2, offset: -1, k: 0.025, x0: 128 });

export const unknownWavesNormalizeFn = (x: number) => -Math.abs(unknownWavesLogisticFunction(x));
