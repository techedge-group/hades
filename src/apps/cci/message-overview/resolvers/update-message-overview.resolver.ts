import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateMessageOverviewCommand } from '@hades/cci/message-overview/application/update/update-message-overview.command';
import { FindMessageOverviewByIdQuery } from '@hades/cci/message-overview/application/find/find-message-overview-by-id.query';
import { CciUpdateMessageOverviewInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.messageOverview.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class UpdateMessageOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateMessageOverview')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('payload') payload: CciUpdateMessageOverviewInput, @Args('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateMessageOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.numberMax,
            payload.numberDays,
            payload.success,
            payload.cancelled,
            payload.delivering,
            payload.error,
            payload.holding,
            payload.toBeDelivered,
            payload.waiting,
            constraint,
        ));
        
        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(payload.id, constraint));
    }
}