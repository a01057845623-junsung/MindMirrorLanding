import { useCallback, useEffect, useState } from 'react';

/** 5분(300초) 카운트다운 타이머 훅 */
export default function useCountdown(total = 300) {
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const id = setInterval(() => setLeft((l) => (l <= 1 ? 0 : l - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (left === 0) setRunning(false);
  }, [left]);

  const start = useCallback(() => {
    setLeft((l) => (l === 0 ? total : l));
    setRunning(true);
  }, [total]);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    setRunning(false);
    setLeft(total);
  }, [total]);
  const finish = useCallback(() => {
    setRunning(false);
    setLeft(0);
  }, []);

  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');

  return {
    left,
    running,
    done: left === 0,
    progress: 1 - left / total,
    label: `${mm}:${ss}`,
    start,
    pause,
    reset,
    finish,
  };
}
