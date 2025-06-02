export type AuthErrorCode = 'INVALID_EMAIL' | 'INVALID_EMAIL_OR_PASSWORD';

export const AuthErrorCode: Record<string, AuthErrorCode> = {
  InvalidCreds: 'INVALID_EMAIL_OR_PASSWORD',
};
