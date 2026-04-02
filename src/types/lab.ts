export type DeviceState = {
  status: 'idle' | 'configured' | 'online';
  lastCommand?: string;
};

export type LabStep = {
  id: string;
  title: string;
  objective: string;
  expectedCommand: string;
  hint: string;
};
