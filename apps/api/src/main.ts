import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validatePipeInstance } from './utils/validation-pipe-instance';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(validatePipeInstance);
  await app.listen(3000);
}
bootstrap();
