declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    ORIGIN: string;
    REDIS_URL: string;
    GITHUB_CLIENT_SECRETS: string;
    GITHUB_CLIENT_ID: string;
  }
}