import Konva from 'konva';
import { RefObject, useCallback, useReducer } from 'react';
import useInterval from '../../hooks/useInterval';
import {
  AutosizeTextActionType,
  autosizeTextInitialState,
  autosizeTextReducer,
  AutosizeTextState,
} from './autosizeTextReducer';

interface UseAutosizeTextInput {
  textRef: RefObject<Konva.Text>;
  maxHeight: number;
  maxWidth: number;
  widthTolerance?: number;
}

type UseAutosizeTextOutput = [AutosizeTextState, () => void];

export const useAutosizeText = ({
  textRef,
  maxWidth,
  maxHeight,
  widthTolerance = 0.975,
}: UseAutosizeTextInput): UseAutosizeTextOutput => {
  const [state, dispatch] = useReducer(autosizeTextReducer, autosizeTextInitialState);
  const startResize = useCallback(() => {
    dispatch({ type: AutosizeTextActionType.START_RESIZE });
  }, []);

  useInterval(
    () => {
      if (textRef.current) {
        const { current: text } = textRef;

        if (!state.widthFitted) {
          if (text.getTextWidth() < maxWidth * widthTolerance) {
            dispatch({ type: AutosizeTextActionType.INCREASE });
          } else if (text.getTextWidth() > maxWidth) {
            dispatch({ type: AutosizeTextActionType.DECREASE });
          } else {
            dispatch({ type: AutosizeTextActionType.WIDTH_FITTED });
          }
        } else if (!state.heightFitted) {
          if (text.height() > maxHeight) {
            dispatch({ type: AutosizeTextActionType.DECREASE });
          } else {
            dispatch({ type: AutosizeTextActionType.FINISH_RESIZE });
          }
        }
      }
    },
    { delay: 50, paused: state.isVisible },
  );

  return [state, startResize];
};
