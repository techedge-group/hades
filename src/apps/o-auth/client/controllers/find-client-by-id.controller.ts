import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ClientDto } from './../dto/client.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';

@ApiTags('[o-auth] client')
@Controller('o-auth/client')
@Permissions('oAuth.client.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindClientByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find client by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ClientDto })
    async main(@Param('id') id: string, @Body('constraint') constraint?: QueryStatement, )
    {
        return await this.queryBus.ask(new FindClientByIdQuery(id, constraint));
    }
}