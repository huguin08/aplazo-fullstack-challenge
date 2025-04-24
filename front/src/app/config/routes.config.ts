export const ROUTE_CONFIG = {
  register: 'auth',
  app: 'apz',
  home: 'home',
  historial: 'historial',
} as const;

export type RouteKey = keyof typeof ROUTE_CONFIG;
export type Route = (typeof ROUTE_CONFIG)[RouteKey];
