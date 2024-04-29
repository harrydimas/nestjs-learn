import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from './role/role.enum';
import { Roles } from './role/role.decorator';
import { RolesGuard } from './role/role.guard';

@UseGuards(RolesGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(Role.ADMIN)
  getHello(): string {
    return this.appService.getHello();
  }
}
