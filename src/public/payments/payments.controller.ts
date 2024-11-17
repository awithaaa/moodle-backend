import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { AddPaymentDto } from './dto/addPayment.dto';

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

  @Get('user')
  async getLastPaymentByUserId(
    @Query('id') id: number,
    @Query('month') month: number,
  ) {
    return await this.paymentsService.getLastPaymentByUserId(id, month);
  }

  @Delete()
  async deletePaymentById(@Query('id') id: number) {
    return await this.paymentsService.deletePaymentById(id);
  }
}
