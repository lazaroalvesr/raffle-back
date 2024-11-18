import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { TicketService } from '../ticket/ticket.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, TicketService]
})
export class PaymentModule {}
