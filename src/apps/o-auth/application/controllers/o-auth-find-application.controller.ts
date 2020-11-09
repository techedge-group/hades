import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ApplicationDto } from './../dto/application.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindApplicationQuery } from '@hades/o-auth/application/application/find/find-application.query';

@ApiTags('[o-auth] application')
@Controller('o-auth/application')
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindApplicationController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find application according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ApplicationDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindApplicationQuery(queryStatement, constraint, { timezone }));
    }
}