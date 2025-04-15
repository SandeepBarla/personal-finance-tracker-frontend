// src/app/core/utils/api.utils.ts
import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.apiBaseUrl;

// Optional: helper to build full URL
export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
