import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateMessageOverviewDto } from './../dto/create-message-overview.dto';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageOverviewByIdQuery } from '@hades/cci/message-overview/application/find/find-message-overview-by-id.query';
import { CreateMessageOverviewCommand } from '@hades/cci/message-overview/application/create/create-message-overview.command';

@ApiTags('[cci] message-overview')
@Controller('cci/message-overview')
@Permissions('cci.messageOverview.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateMessageOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create message-overview' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: MessageOverviewDto })
    @TenantPolicy()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: CreateMessageOverviewDto)
    {
        await this.commandBus.dispatch(new CreateMessageOverviewCommand(
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
            
        ));

        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(payload.id));
    }
}