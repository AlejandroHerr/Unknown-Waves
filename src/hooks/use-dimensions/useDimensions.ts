import { useState, useLayoutEffect, useRef } from 'react';
import { DimensionObject } from './types';

type UseDimensionsOutput = [DimensionObject, React.RefObject<HTMLDivElement>];

interface UseDimensionsInput {
  liveMeasure?: boolean;
}

const getDimensionObject = (node: HTMLDivElement): DimensionObject => {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: rect.x !== undefined ? rect.x : rect.top,
    left: rect.y !== undefined ? rect.y : rect.left,
    x: rect.x !== undefined ? rect.x : rect.left,
    y: rect.y !== undefined ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
};

export const useDimensions = ({ liveMeasure = true }: UseDimensionsInput = {}): UseDimensionsOutput => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    right: 0,
    bottom: 0,
  });
  const nodeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (nodeRef) {
      const measure = () => {
        window.requestAnimationFrame(() => {
          if (nodeRef.current) {
            setDimensions(getDimensionObject(nodeRef.current));
          }
        });
      };

      measure();

      if (liveMeasure) {
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);

        return () => {
          window.removeEventListener('resize', measure);
          window.removeEventListener('scroll', measure);
        };
      }
    }
  }, [liveMeasure]);

  return [dimensions, nodeRef];
};
