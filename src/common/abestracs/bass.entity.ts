import { PrimaryGeneratedColumn } from "typeorm";

export class BassEntity{
  @PrimaryGeneratedColumn("increment")
  id:number
}