import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindPermissionQuery } from '@hades/iam/permission/application/find/find-permission.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IamPermission } from './../../../../graphql';

@Resolver()
@Permissions('iam.permission.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindPermissionResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindPermission')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<IamPermission>
    {
        return await this.queryBus.ask(new FindPermissionQuery(queryStatement, constraint));
    }
}