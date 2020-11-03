import { NestFactory } from '@nestjs/core';
import { InternalServerErrorException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { urlencoded, json } from 'express';
import { AppModule } from './app.module';
import { EnvironmentService } from '@hades/shared/domain/services/environment.service';
import { LoggerService } from './apps/core/modules/logger/logger.service';
import * as moment from 'moment-timezone';

async function bootstrap()
{
    const app                   = await NestFactory.create(AppModule, {logger: false});
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

    app.use(json({ limit: environmentService.get<string>('APP_LIMIT_REQUEST_SIZE') }));
    app.use(urlencoded({ extended: true, limit: environmentService.get<string>('APP_LIMIT_REQUEST_SIZE') }));
    app.useLogger(loggerService);

    // check that exist timezone in environment file
    if (!environmentService.get<string>('APP_TIMEZONE')) throw new InternalServerErrorException(`APP_TIMEZONE variable is not defined in environment file`);

    // check valid timezone in environment file
    if (!moment.tz.zone(environmentService.get<string>('APP_TIMEZONE'))) throw new InternalServerErrorException(`APP_TIMEZONE environment value has an incorrect value: ${environmentService.get<string>('APP_TIMEZONE')}`);

    // set data source timezone for application
    process.env.TZ = environmentService.get<string>('APP_TIMEZONE');

    // set timezone, this timezone will be used for:
    // - create data in application scope, (createdAt, updatedAt, deletedAt, etc.)
    // - default timezone for dates received, if has not defined X-Timezone header
    // - data will be returned with this timezone, if has not defined X-Timezone header
    moment.tz.setDefault(process.env.TZ);

    await app.listen(environmentService.get<number>('APP_PORT'));
}
bootstrap();
