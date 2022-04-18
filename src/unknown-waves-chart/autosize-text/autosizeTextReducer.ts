export interface AutosizeTextState {
  fontSize: number;
  widthFitted: boolean;
  heightFitted: boolean;
  isVisible: boolean;
}

export enum AutosizeTextActionType {
  START_RESIZE = 'START_RESIZE',
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  WIDTH_FITTED = 'WIDTH_FITTED',
  FINISH_RESIZE = 'FINISH_RESIZE',
}

export const autosizeTextInitialState: AutosizeTextState = {
  fontSize: 10,
  widthFitted: false,
  heightFitted: false,
  isVisible: false,
};

export const autosizeTextReducer = (
  state: AutosizeTextState,
  { type }: { type: AutosizeTextActionType },
): AutosizeTextState => {
  if (type === AutosizeTextActionType.START_RESIZE) {
    return { ...state, isVisible: false, widthFitted: false, heightFitted: false };
  }
  if (type === AutosizeTextActionType.INCREASE) {
    return { ...state, fontSize: state.fontSize * 1.5 };
  }
  if (type === AutosizeTextActionType.DECREASE) {
    return { ...state, fontSize: state.fontSize * 0.95 };
  }
  if (type === AutosizeTextActionType.WIDTH_FITTED) {
    return { ...state, widthFitted: true };
  }
  if (type === AutosizeTextActionType.FINISH_RESIZE) {
    return { ...state, isVisible: true, heightFitted: true };
  }

  return state;
};
