

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
    JWT_SECRET:string
  } 
}