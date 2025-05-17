declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    ORIGIN: string;
    SERVER_BASE_URL: string;
  }
}
