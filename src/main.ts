import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { EnvironmentService } from '@hades/shared/domain/environment/environment.service';
import { AppModule } from './app.module';
import { LoggerService } from './apps/core/modules/logger/logger.service';

async function bootstrap() 
{
    const app                   = await NestFactory.create(AppModule, { logger: false });
    const environmentService    = app.get(EnvironmentService);
    const loggerService         = app.get(LoggerService);

    // set swagger config
    const options = new DocumentBuilder()
        .setTitle('Hades API')
        .setDescription('API to consume Hades services')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    
    app.useLogger(loggerService);
    await app.listen(environmentService.get<number>('APP_PORT'));
}
bootstrap();
