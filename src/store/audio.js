import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Howler } from "howler";

const useAudioStore = create(
  immer((set) => ({
    volume: 1.0,
    isMuted: false,

    setVolume: (vol) =>
      set((state) => {
        state.volume = vol;
        Howler.volume(vol);
        if (vol > 0 && state.isMuted) {
          state.isMuted = false;
          Howler.mute(false);
        }
      }),

    toggleMute: () =>
      set((state) => {
        const newMuted = !state.isMuted;
        state.isMuted = newMuted;
        Howler.mute(newMuted);
      }),
  }))
);

export default useAudioStore;
