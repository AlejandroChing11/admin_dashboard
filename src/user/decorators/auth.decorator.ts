

import { applyDecorators, UseGuards } from "@nestjs/common";
import { validRoles } from "../interfaces";
import { AuthGuard } from "@nestjs/passport";
import { RoleProtected } from ".";
import { UserRoleGuard } from "../guards/user-role.guard";

export function Auth(...roles: validRoles[]) {


  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  )

}