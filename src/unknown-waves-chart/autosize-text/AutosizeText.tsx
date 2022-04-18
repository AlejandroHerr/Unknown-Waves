import React, { ComponentProps, useEffect, useRef } from 'react';
import Konva from 'konva';
import { Text as KonvaText } from 'react-konva';
import { useAutosizeText } from './useAutosizeText';

interface AutosizeTextProps extends ComponentProps<typeof KonvaText> {
  centerH?: boolean;
  centerV?: boolean;
  maxHeight: number;
  maxWidth: number;
  offsetX?: number;
  offsetY?: number;
  paddingX?: number;
}

export const AutosizeText: React.FC<AutosizeTextProps> = ({
  centerH = false,
  centerV = false,
  fontSize,
  maxHeight,
  maxWidth,
  offsetX = 0,
  offsetY = 0,
  opacity,
  paddingX = 0,
  ref,
  text,
  ...props
}) => {
  const textRef = useRef<Konva.Text>(null);
  const [state, restartAutosize] = useAutosizeText({ textRef, maxHeight, maxWidth: maxWidth - paddingX });

  useEffect(() => {
    if (!!text || !!maxHeight || !!maxWidth) {
      restartAutosize();
    }
  }, [maxHeight, maxWidth, restartAutosize, text]);

  const x = centerH ? (maxWidth - (textRef.current?.getTextWidth() ?? 0)) / 2 + offsetX : offsetX;
  const y = centerV ? (maxHeight - (textRef.current?.height() ?? 0)) / 2 + offsetY : offsetY;

  return (
    <KonvaText
      {...props}
      text={text}
      ref={textRef}
      fontSize={state.fontSize}
      opacity={state.isVisible ? opacity ?? 1 : 0}
      x={x}
      y={y}
    />
  );
};
