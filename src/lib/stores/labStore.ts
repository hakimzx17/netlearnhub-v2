import { create } from 'zustand';

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

export const useLabStore = create<LabStore>((set) => ({
  phase: 1,
  currentStep: 0,
  commandHistory: [],
  topologyState: {},
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
    set({ phase: 1, currentStep: 0, commandHistory: [], topologyState: {} });
  },
}));
