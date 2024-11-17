import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, UserService],
})
export class PaymentsModule {}
