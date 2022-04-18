/** @jsxImportSource @emotion/react */
import React from 'react';
import { Layer, Line, Stage } from 'react-konva';
import { AutosizeText } from './autosize-text/AutosizeText';
import { useAppTheme } from '../styles/useAppTheme';
import { DimensionObject } from '../hooks/use-dimensions/types';
import { TrackInfo } from '../wave-radio/types';
import { useFFTWaves } from './fft/useFFTWaves';

interface UnknownWavesChartProps {
  dimensions: DimensionObject;
  trackInfo: TrackInfo;
  audioElementRef: React.RefObject<HTMLAudioElement>;
  ready: boolean;
  maxWidth?: number;
  maxHeight?: number;
  refreshRate?: number;
  paddingPointsFactor?: number;
  waveAmplitude?: number;
  waveSpacing?: number;
  noiseFactor?: number;
  textMaxHeight?: number;
}

export const UnknownWavesChart: React.FC<UnknownWavesChartProps> = ({
  dimensions,
  audioElementRef,
  ready,
  maxWidth = 500,
  maxHeight = 900,
  waveAmplitude = 80,
  waveSpacing = 10.6,
  paddingPointsFactor = 0.5,
  noiseFactor = 15,
  refreshRate = 100,
  trackInfo,
  textMaxHeight = 100,
}) => {
  const availableWidth = Math.min(maxWidth, dimensions.width);
  const availableHeight = Math.min(maxHeight, dimensions.height);
  const waveLines = useFFTWaves({
    audioElementRef,
    height: availableHeight - 2 * textMaxHeight,
    noiseFactor,
    paddingPointsFactor,
    ready,
    refreshRate,
    waveAmplitude,
    waveSpacing,
    width: availableWidth,
  });
  const appTheme = useAppTheme();

  return (
    <div
      css={{
        width: `${availableWidth}px`,
        top: `calc(50% - ${availableHeight}px/2)`,
        left: `calc(50% - ${availableWidth}px/2)`,
        height: `${availableHeight}px`,
        margin: 'auto',
      }}
    >
      <Stage width={availableWidth} height={availableHeight}>
        <Layer>
          <AutosizeText
            maxHeight={textMaxHeight}
            maxWidth={availableWidth}
            paddingX={20}
            text={trackInfo.artist.toUpperCase()}
            fill={appTheme.colors.primary}
            fontVariant={appTheme.fontWeight.bold}
            fontFamily={appTheme.fontFamily.sans}
            align="center"
            centerV
            centerH
          />
          <AutosizeText
            maxHeight={textMaxHeight}
            maxWidth={availableWidth}
            paddingX={20}
            text={trackInfo.title.toUpperCase()}
            fill={appTheme.colors.primary}
            fontVariant={appTheme.fontWeight.bold}
            fontFamily={appTheme.fontFamily.sans}
            align="center"
            offsetY={availableHeight - textMaxHeight}
            centerH
          />
          {waveLines.map((points, index) => (
            <Line
              key={index}
              x={0}
              y={index * waveSpacing + textMaxHeight}
              tension={0.5}
              stroke={appTheme.colors.primary}
              points={points}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
