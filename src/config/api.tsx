const BASE_API_URL = 'http://localhost:5000/api';

export function getApiEndPoint(endpoint: string): string {
  return `${BASE_API_URL}${endpoint}`;
}