import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateJobOverviewDto } from './../dto/create-job-overview.dto';
import { JobOverviewDto } from './../dto/job-overview.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

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
import { FindJobOverviewByIdQuery } from '@hades/cci/job-overview/application/find/find-job-overview-by-id.query';
import { CreateJobOverviewCommand } from '@hades/cci/job-overview/application/create/create-job-overview.command';

@ApiTags('[cci] job-overview')
@Controller('cci/job-overview')
@Permissions('cci.jobOverview.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateJobOverviewController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create job-overview' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: JobOverviewDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateJobOverviewDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateJobOverviewCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindJobOverviewByIdQuery(payload.id));
    }
}