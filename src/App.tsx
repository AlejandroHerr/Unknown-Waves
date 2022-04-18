import React from 'react';
import AudioPlayer from './audio-player/AudioPlayer';

import { UnknownWavesChart } from './unknown-waves-chart/UnknownPleasuresChart';
import { AppLayout } from './app-layout/AppLayout';
import { useHTMLAudioElement } from './audio-player/useHTMLAudioElement';
import { useWaveRadio } from './wave-radio/useWaveRadio';
import { WaveRadioStation } from './wave-radio/types';
import { useDimensions } from './hooks/use-dimensions/useDimensions';

function App() {
  const [audioRef, { canPlay }] = useHTMLAudioElement();

  const { stationUrl, trackInfo } = useWaveRadio({ station: WaveRadioStation.SOVIET });

  const [dimensions, ref] = useDimensions({ liveMeasure: true });

  return (
    <AppLayout>
      <AudioPlayer src={stationUrl} setRef={audioRef} />
      <div ref={ref} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <UnknownWavesChart dimensions={dimensions} trackInfo={trackInfo} audioElementRef={audioRef} ready={canPlay} />
      </div>
    </AppLayout>
  );
}

export default App;
