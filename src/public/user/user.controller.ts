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
  Post,
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

  // Update endpoint by User
  @Patch()
  @UseGuards(JwtAuthGuard)
  async upateUser(@Body() dto: UpdateUserDto, @Req() req) {
    return await this.userService.updateUser(dto, req.user.username);
  }

  // Update endpoint by admin
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

  // Passkey
  @Post('passkey/token')
  async generatePassToken(@Body() dto: any) {
    return await this.userService.generatePassToken(dto);
  }

  @Get('passkey/:token')
  async getPassToken(@Param('token') token: string) {
    return await this.userService.getPassToken(token);
  }

  @Patch('passkey/change/:token')
  async changePassByToken(@Param('token') token: string, @Body() dto: any) {
    return await this.userService.changePassByToken(token, dto);
  }
}
