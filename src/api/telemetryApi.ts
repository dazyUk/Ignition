import axios from 'axios';
import { TelemetryData } from '../types';

const API_URL = 'http://localhost:3001/api/telemetry';

export const fetchTelemetryData = async (): Promise<TelemetryData> => {
  try {
    const response = await axios.get<TelemetryData>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching telemetry data:', error);
    throw error;
  }
};