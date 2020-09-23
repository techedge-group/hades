import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AccessTokenDto } from './../dto/access-token.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAccessTokenQuery } from '@hades/o-auth/access-token/application/find/find-access-token.query';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token')
export class FindAccessTokenController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find access-token according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AccessTokenDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new FindAccessTokenQuery(queryStatement));   
    }
}