import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { TenantDto } from './../dto/tenant.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetTenantsQuery } from '@hades/admin/tenant/application/get/get-tenants.query';

@ApiTags('[admin] tenant')
@Controller('admin/tenants')
export class GetTenantsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find tenants according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [TenantDto] })
    @ApiBody({ type: [QueryStatementInput] })
    @ApiQuery({ name: 'query', type: [QueryStatementInput] })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        return await this.queryBus.ask(new GetTenantsQuery(queryStatements));   
    }
}