import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function typeOrmConfig ():TypeOrmModuleOptions{
  const {DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USERNAME}=process.env
  return{
    type:"postgres",
    host:DB_HOST,
    port:DB_PORT,
    username:DB_USERNAME,
    password:DB_PASSWORD,
    database:DB_NAME,
    autoLoadEntities:true,
    synchronize:true
  }
}