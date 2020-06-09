import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LangDto } from './../../dto/lang.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { QueryStatementInput } from './../../../../graphql';

@ApiTags('lang')
@ApiOkResponse({ description: 'The record has been successfully created.', type: LangDto})
@Controller('admin/langs')
export class GetLangsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetLangsQuery(queryStatements));   
    }
}