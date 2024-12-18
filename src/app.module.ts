import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './lib/mailer.config';
import { PaymentModule } from './payment/payment.module';
import { RaffleModule } from './raffle/raffle.module';
import { TicketModule } from './ticket/ticket.module';
import { WebHookModule } from './web-hook/web-hook.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BlockScriptsMiddleware } from './lib/block-scripts.middleware';

@Module({
  imports: [
    MailerModule.forRoot(mailerConfig),
    PrismaModule,
    AuthModule,
    PaymentModule,
    RaffleModule,
    TicketModule,
    WebHookModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Bloqueia apenas rotas que começam com /scripts
    consumer.apply(BlockScriptsMiddleware).forRoutes('/scripts*');
  }
}