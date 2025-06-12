declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ORIGIN: string;
      BETTER_AUTH_SECRET: string;
      BETTER_AUTH_URL: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_NAME: string;
    }
  }
}

export {}
