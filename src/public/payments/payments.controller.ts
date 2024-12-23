import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { AddPaymentDto } from './dto/addPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async addPayment(@Body() dto: AddPaymentDto) {
    return await this.paymentsService.addPayment(dto);
  }

  @Get()
  async getAllPayments() {
    return await this.paymentsService.getAllPayments();
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: number) {
    return await this.paymentsService.getPaymentById(id);
  }

  @Get('user/:id/:month')
  async getLastPaymentByUserId(
    @Param('id') id: number,
    @Param('month') month: number,
  ) {
    return await this.paymentsService.getLastPaymentByUserId(id, month);
  }

  @Patch('edit/:id')
  async editPaymentById(
    @Param('id') id: number,
    @Body() dto: UpdatePaymentDto,
  ) {
    return await this.paymentsService.editPaymentById(dto, id);
  }

  @Delete()
  async deletePaymentById(@Query('id') id: number) {
    return await this.paymentsService.deletePaymentById(id);
  }
}
