import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { DeviceState } from '../../types/lab';

type LabStore = {
  phase: 1 | 2;
  currentStep: number;
  commandHistory: string[];
  topologyState: Record<string, DeviceState>;
  submitCommand: (command: string) => void;
  advanceStep: () => void;
  completePhase: () => void;
  resetLab: () => void;
};

const initialLabState = {
  phase: 1 as const,
  currentStep: 0,
  commandHistory: [] as string[],
  topologyState: {} as Record<string, DeviceState>,
};

export const useLabStore = create<LabStore>()(
  persist(
    (set) => ({
      ...initialLabState,
      submitCommand: (command) => {
        set((state) => ({
          commandHistory: [...state.commandHistory, command],
          topologyState: {
            ...state.topologyState,
            sw1: { status: 'configured', lastCommand: command },
          },
        }));
      },
      advanceStep: () => {
        set((state) => ({ currentStep: state.currentStep + 1 }));
      },
      completePhase: () => {
        set((state) => ({ phase: state.phase === 1 ? 2 : 2 }));
      },
      resetLab: () => {
        set(initialLabState);
      },
    }),
    {
      name: 'netlearnhub.lab.v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        phase: state.phase,
        currentStep: state.currentStep,
        commandHistory: state.commandHistory,
        topologyState: state.topologyState,
      }),
    },
  ),
);
