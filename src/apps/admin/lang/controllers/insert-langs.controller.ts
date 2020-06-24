import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { CreateLangDto } from './../dto/create-lang.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertLangsCommand } from '@hades/admin/lang/application/insert/insert-langs.command';

@ApiTags('lang')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('admin/langs')
export class InsertLangsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiBody({ 
        type: [CreateLangDto]
    })
    async main(@Body() payload: CreateLangDto[])
    {
        await this.commandBus.dispatch(new InsertLangsCommand(payload));
    }
}