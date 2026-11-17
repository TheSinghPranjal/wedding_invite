import { useSyncExternalStore } from 'react';
import weddingData from '../data/weddingData';

type State = { playing: boolean; failed: boolean };
let state: State = { playing: false, failed: false };
let audio: HTMLAudioElement | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const set = (next: Partial<State>) => { state = { ...state, ...next }; emit(); };

function ensure() {
  if (audio) return audio;
  audio = new Audio(weddingData.music.src);
  audio.loop = true;
  audio.addEventListener('error', () => set({ failed: true, playing: false }));
  return audio;
}

/** User-gesture-only playback. Never autoplays. */
export const music = {
  async play() {
    try { await ensure().play(); set({ playing: true }); } catch { set({ failed: true }); }
  },
  pause() { audio?.pause(); set({ playing: false }); },
  toggle() { return state.playing ? music.pause() : music.play(); },
};

export function useMusic(): State {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state, () => state);
}
