import { useEffect, useRef } from 'react';

type UseIntervalCallback = () => void;

const useInterval = (callback: UseIntervalCallback, { delay, paused }: { delay: number; paused?: boolean }): void => {
  const savedCallback = useRef<UseIntervalCallback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (paused) {
      return () => {};
    }

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    let id = setInterval(tick, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay, paused]);
};

export default useInterval;
