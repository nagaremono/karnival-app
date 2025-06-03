export type AuthErrorCode =
  | 'INVALID_EMAIL'
  | 'INVALID_EMAIL_OR_PASSWORD'
  | 'USER_ALREADY_EXISTS';

export const AuthErrorCode: Record<string, AuthErrorCode> = {
  InvalidCreds: 'INVALID_EMAIL_OR_PASSWORD',
  UserExists: 'USER_ALREADY_EXISTS',
};
