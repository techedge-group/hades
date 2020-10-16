import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindBoundedContextQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IamBoundedContext } from './../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.get')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class FindBoundedContextResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindBoundedContext')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, ): Promise<IamBoundedContext>
    {
        return await this.queryBus.ask(new FindBoundedContextQuery(queryStatement, constraint));
    }
}