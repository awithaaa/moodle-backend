import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  Patch,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserByAdminDto } from './dto/update-user-admin.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Request() req) {
    return await this.userService.findByEmail(req.user.username);
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return await this.userService.findAll();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async upateUser(@Body() dto: UpdateUserDto, @Req() req) {
    return await this.userService.updateUser(dto, req.user.username);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUserById(
    @Param('id') id: number,
    @Body() dto: UpdateUserByAdminDto,
  ) {
    return await this.userService.updateUserById(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUserById(@Param('id') id: number) {
    return await this.userService.deleteUserById(id);
  }
}
