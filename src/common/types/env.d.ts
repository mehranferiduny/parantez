

namespace NodeJS{
  interface ProcessEnv{
    //!App
    PORT:number
    //!DB
    DB_PORT:number
    DB_NAME:string
    DB_USERNAME:string
    DB_PASSWORD:string
    DB_HOST:string
    //!Secret
    COOKIE_SECRET:string
    JWT_SECRET_OTP:string
    JWT_SECRET_ACSSES:string
    JWT_SECRET_EMAIL:string
    JWT_SECRET_PHONE:string
    //!OAuth
    GOOGLE_CLIENT_ID:string
    GOOGLE_CLINET_SECRET:string
  } 
}

