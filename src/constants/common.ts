export const TITLE = {
  LOGIN: 'Login',
  DASHBOARD: 'Dashboard',
  USER: 'User',
  PLAN: 'Plan',
  SUBSCRIPTION: 'Subscription',
  ROOM: 'Room',
  MAP: 'Map',
  ACCOUNT: 'User',
  ADMINISTRATION: 'Administration',
  PAYMENT: 'Payment',
};

export const ROUTE_PATH = {
  LOGIN: '/login',
  MAP: '/map',
  DASHBOARD: '/dashboard',
  ROOM: '/rooms',
  EXAM: '/exam',
  CREATE_EXAM: '/exam_create',
  INFORMATION: '/information',
  PROFILE: '/profile',
  ACCOUNT: '/account',
  ADMINISTRATION: '/administration',
  USER: '/user',
  PAYMENT: '/payment',
};

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_TOKEN_EXPIRED_TIME: 'access_token_expired_time',
  REFRESH_TOKEN_EXPIRED_TIME: 'refresh_token_expired_time',
};

export const LS_KEYS = {
  USER: 'user',
  CUSTOMER_SUGGESTION: 'customer_suggestion',
};

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export enum HTTP_STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export const PAGE_LIMIT = 20;
export const DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${TIME_FORMAT} ${DATE_FORMAT}`;
