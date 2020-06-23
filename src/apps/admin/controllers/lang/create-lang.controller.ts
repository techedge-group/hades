import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateLangDto } from './../../dto/lang/create-lang.dto';
import { LangDto } from './../../dto/lang/lang.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';
import { CreateLangCommand } from '@hades/admin/lang/application/create/create-lang.command';

@ApiTags('lang')
@ApiCreatedResponse({ description: 'The record has been created successfully.', type: LangDto})
@Controller('admin/lang')
export class CreateLangController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    async main(@Body() payload: CreateLangDto)
    {
        await this.commandBus.dispatch(new CreateLangCommand(
            payload.id, 
            payload.name,
            payload.image,
            payload.iso6392,
            payload.iso6393,
            payload.ietf,
            payload.sort,
            payload.isActive
        ));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id));
    }
}