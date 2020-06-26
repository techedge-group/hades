import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetModulesQuery } from '@hades/admin/module/application/get/get-modules.query';
import { DeleteModulesCommand } from '@hades/admin/module/application/delete/delete-modules.command';

@ApiTags('module')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: ModuleDto})
@Controller('admin/modules')
export class DeleteModulesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const modules = await this.queryBus.ask(new GetModulesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteModulesCommand(queryStatements));

        return modules;
    }
}