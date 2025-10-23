import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExamplesModule } from './examples/examples.module';

@Module({
  imports: [PrismaModule, ExamplesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
