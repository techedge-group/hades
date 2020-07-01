import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateMessagesOverviewQuery } from '@hades/bplus-it-sappi/message-overview/application/paginate/paginate-messages-overview.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@ApiTags('[bplus-it-sappi] message-overview')
@ApiOkResponse({ description: 'The records has been paginated successfully.', type: MessageOverviewDto})
@Controller('bplus-it-sappi/messages-overview/paginate')
export class PaginateMessagesOverviewController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate messages-overview' })
    async main(@Body('query') queryStatements: QueryStatementInput[], @Body('constraint') constraint: QueryStatementInput[])
    {
        return await this.queryBus.ask(new PaginateMessagesOverviewQuery(queryStatements, constraint));   
    }
}