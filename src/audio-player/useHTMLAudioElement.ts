import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface HTMLAudioElementState {
  canPlay: boolean;
  playing: boolean;
}

export const useHTMLAudioElement = (): [React.RefObject<HTMLAudioElement>, HTMLAudioElementState, () => void] => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    const { current } = audioRef;

    current?.play();
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      const { current: audioElement } = audioRef;
      const onPlay = () => {
        setPlaying(true);
      };
      const onPause = () => {
        setPlaying(false);
      };
      const onCanPlay = () => {
        setCanPlay(true);
      };

      audioElement.play();

      audioElement.addEventListener('play', onPlay);
      audioElement.addEventListener('pause', onPause);
      audioElement.addEventListener('canplay', onCanPlay);

      return () => {
        audioElement.removeEventListener('play', onPlay);
        audioElement.removeEventListener('pause', onPause);
        audioElement.removeEventListener('canplay', onCanPlay);
      };
    }
  }, []);

  return [audioRef, { canPlay, playing }, play];
};
