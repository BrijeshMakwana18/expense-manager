declare global {
  namespace NodeJS {
    interface processEnv {
      DB_CONNECT: string;
      TOKEN_SECRET: string;
    }
  }
}

export {};
