// Shared types and schemas
// Agregá acá los schemas de Zod y tipos que compartan frontend y backend

export const healthSchema = {
  status: 'ok',
  timestamp: new Date().toISOString(),
};

export type HealthResponse = typeof healthSchema;
