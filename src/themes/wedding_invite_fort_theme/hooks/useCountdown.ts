import { useEffect, useState } from 'react';

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function calc(target: number): CountdownValues {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    isComplete: false,
  };
}

export function useCountdown(target: Date): CountdownValues {
  const t = target.getTime();
  const [v, setV] = useState(() => calc(t));
  useEffect(() => {
    setV(calc(t));
    const id = setInterval(() => setV(calc(t)), 1000);
    return () => clearInterval(id);
  }, [t]);
  return v;
}
