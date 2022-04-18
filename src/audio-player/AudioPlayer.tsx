/** @jsxImportSource @emotion/react */
import React, { memo, RefObject, FunctionComponent } from 'react';

interface AudioPlayerProps {
  src: string;
  setRef: RefObject<HTMLAudioElement>;
}

const AudioPlayer: FunctionComponent<AudioPlayerProps> = ({ src, setRef }: AudioPlayerProps) => (
  <audio
    controls
    ref={setRef}
    crossOrigin="anonymous"
    src={`${src}?${Math.floor(Math.random() * 100)}`}
    css={{
      display: 'none',
      position: 'absolute',
      zIndex: 99999,
    }}
  >
    Your browser does not support the
    <code>audio</code> element.
  </audio>
);

export default memo(AudioPlayer);
