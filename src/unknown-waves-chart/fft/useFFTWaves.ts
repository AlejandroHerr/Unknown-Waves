import React, { useCallback, useEffect, useRef, useState } from 'react';
import { generateNoise } from './generateNoise';
import { useAnalyserNode } from './useAnalayserNode';
import { unknownWavesNormalizeFn } from './unknownWavesNormalizeFn';
type WaveLine = number[];

interface UseFFTWavesInput {
  audioElementRef: React.RefObject<HTMLAudioElement>;
  height: number;
  noiseFactor: number;
  paddingPointsFactor: number;
  ready: boolean;
  refreshRate: number;
  waveAmplitude: number;
  waveSpacing: number;
  width: number;
}

const MIN_NUMBER_OF_LINES = 10;

export const useFFTWaves = ({
  audioElementRef,
  height,
  noiseFactor,
  paddingPointsFactor,
  ready,
  refreshRate,
  waveAmplitude,
  waveSpacing,
  width,
}: UseFFTWavesInput): WaveLine[] => {
  const visualizeReq = useRef<number>();
  const previousTimeRef = useRef<number>();
  const [analyserNode] = useAnalyserNode({ audioElementRef, options: { fftSize: 2048 }, ready });
  const [waveLines, setWaveLines] = useState<WaveLine[]>([]);
  const visualize = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined && time - previousTimeRef.current < refreshRate) {
        visualizeReq.current = requestAnimationFrame(visualize);

        return;
      }

      previousTimeRef.current = time;
      visualizeReq.current = requestAnimationFrame(visualize);

      const { fftSize } = analyserNode as AnalyserNode;

      const dataArray = new Uint8Array(fftSize);

      analyserNode?.getByteTimeDomainData(dataArray);

      const numberOfLines = Math.max(Math.floor(height / waveSpacing) - 1, MIN_NUMBER_OF_LINES);
      const pointsPerLine = Math.floor(fftSize / numberOfLines);
      const paddingPoints = Math.ceil(pointsPerLine * paddingPointsFactor);
      const totalPoints = pointsPerLine + paddingPoints;
      const sliceWidth = (width * 1.0) / (totalPoints - 1);

      const pointIsPaddingPoint = (pointNumber: number) =>
        pointNumber >= paddingPoints / 2 && pointNumber < paddingPoints / 2 + pointsPerLine;

      const lines: number[][] = !numberOfLines
        ? []
        : Array.from(Array(numberOfLines), (_, lineNumber) =>
            Array.from(Array(totalPoints)).reduce<number[]>((linePoints, _, pointNumber) => {
              const x = sliceWidth * pointNumber;

              if (pointIsPaddingPoint(pointNumber)) {
                const dataIndex = pointNumber + pointsPerLine * lineNumber;
                const normalizedValue = unknownWavesNormalizeFn(dataArray[dataIndex]);
                const noise = generateNoise(waveAmplitude, noiseFactor);
                const height = normalizedValue * waveAmplitude;
                const y = height + noise;

                linePoints.push(x, y);
              } else {
                const x = sliceWidth * pointNumber;
                const noise = generateNoise(waveAmplitude, noiseFactor);
                const y = noise;

                linePoints.push(x, y);
              }

              return linePoints;
            }, []),
          );

      setWaveLines(lines);
    },
    [refreshRate, analyserNode, height, waveSpacing, paddingPointsFactor, width, waveAmplitude, noiseFactor],
  );

  useEffect(() => {
    if (analyserNode) {
      visualizeReq.current = requestAnimationFrame(visualize);

      return () => {
        if (visualizeReq.current) {
          cancelAnimationFrame(visualizeReq.current);
        }
      };
    }
  }, [analyserNode, visualize]);

  return waveLines;
};
