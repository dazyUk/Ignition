export interface StorageTank {
  name: string;
  level: number;
  capacity: number;
}

export interface Plant {
  name: string;
  trains: ('Running' | 'Stopped' | 'Idle')[];
}

export interface LocationData {
  storageTanks: StorageTank[];
  plants: Plant[];
  valveBanks?: number[];
}

export interface TelemetryData {
  [location: string]: LocationData;
}