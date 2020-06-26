import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindModuleQuery } from '@hades/admin/module/application/find/find-module.query';

@ApiTags('module')
@ApiOkResponse({ description: 'The record has been successfully created.', type: ModuleDto})
@Controller('admin/module')
export class FindModuleController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new FindModuleQuery(queryStatements));   
    }
}