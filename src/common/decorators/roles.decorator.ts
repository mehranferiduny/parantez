import { SetMetadata } from "@nestjs/common"
import { Roles } from "../enums/roul.enum"

export const Role_Key="Roles"
export const CanAcssec=(...roles:Roles[])=> SetMetadata(Role_Key,roles)
