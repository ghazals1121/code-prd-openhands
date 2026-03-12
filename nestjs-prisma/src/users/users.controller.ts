import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
@ApiTags("users") @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get("me") getMe(@Request() req: any) { return this.usersService.findById(req.user.id); }
}
