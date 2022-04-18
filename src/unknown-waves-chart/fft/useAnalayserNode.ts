import { useEffect, useState } from 'react';

interface AnalyserNodeOptions {
  fftSize: number;
  maxDecibels: number;
  minDecibels: number;
  smoothingTimeConstant: number;
}

interface UseAnalyserNodeInputPort {
  audioElementRef: React.RefObject<HTMLAudioElement>;
  options: Partial<AnalyserNodeOptions>;
  ready: boolean;
}

export const useAnalyserNode = ({
  audioElementRef,
  options,
  ready,
}: UseAnalyserNodeInputPort): [AnalyserNode | undefined] => {
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode>();
  const { fftSize, maxDecibels, minDecibels, smoothingTimeConstant } = {
    fftSize: 2048,
    maxDecibels: -10,
    minDecibels: -90,
    smoothingTimeConstant: 0.85,
    ...options,
  };

  useEffect(() => {
    if (ready && audioElementRef.current) {
      setAnalyserNode((prevAnalyserNode) => {
        if (!prevAnalyserNode) {
          const audioContext = new AudioContext();
          const mediaElementSource = audioContext.createMediaElementSource(audioElementRef.current as HTMLAudioElement);
          const analyser = audioContext.createAnalyser();

          analyser.fftSize = fftSize;
          analyser.maxDecibels = maxDecibels;
          analyser.minDecibels = minDecibels;
          analyser.smoothingTimeConstant = smoothingTimeConstant;

          analyser.connect(audioContext.destination);
          mediaElementSource.connect(analyser);

          return analyser;
        }
      });
    }
  }, [audioElementRef, fftSize, maxDecibels, minDecibels, ready, smoothingTimeConstant]);

  return [analyserNode];
};
