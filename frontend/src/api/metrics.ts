import { api } from './client';
import { Metrics } from '../types/metrics.types';

export const metricsApi = {
  get: () => api.get<Metrics>('/metrics'),
};
