declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      ORIGIN: string;
      BETTER_AUTH_SECRET: string;
      BETTER_AUTH_URL: string;
    }
  }
}

export {}
