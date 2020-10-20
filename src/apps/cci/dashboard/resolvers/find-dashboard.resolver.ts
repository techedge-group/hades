import { Resolver, Query, Args } from '@nestjs/graphql';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';

// custom
import { GetTenantsQuery } from '@hades/iam/tenant/application/get/get-tenants.query';
import { GetSystemsQuery } from '@hades/cci/system/application/get/get-systems.query';
import { GetDashboardChannelsOverviewQuery } from '@hades/cci/channel-overview/application/get/get-dashboard-channels-overview.query';
import { GetDashboardJobsOverviewQuery } from '@hades/cci/job-overview/application/get/get-dashboard-jobs-overview.query';
import { GetDashboardMessagesOverviewQuery } from '@hades/cci/message-overview/application/get/get-dashboard-messages-overview.query';

@Resolver()
@Permissions('cci.dashboard.access')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindDashboardResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindDashboard')
    async main(@CurrentAccount() account: AccountResponse)
    {
        // get tenanat fot this account
        const tenants = await this.queryBus.ask(new GetTenantsQuery({
            where: { 
                id: account.dTenants
            }
        }));

        // get systems for this tenants
        const systems = await this.queryBus.ask(new GetSystemsQuery({
            where: { 
                tenantId: account.dTenants
            }
        }));

        const jobsOverview = await this.queryBus.ask(new GetDashboardJobsOverviewQuery({
            where: { 
                tenantId: account.dTenants,
                systemId: systems.map(system => system.id)
            }
        }));

        const channelsOverview = await this.queryBus.ask(new GetDashboardChannelsOverviewQuery({
            where: { 
                tenantId: account.dTenants,
                systemId: systems.map(system => system.id)
            }
        }));

        const messsagesOverview = await this.queryBus.ask(new GetDashboardMessagesOverviewQuery({
            where: { 
                tenantId: account.dTenants,
                systemId: systems.map(system => system.id)
            }
        }));

        return {
            tenants,
            systems,
            jobsOverview,
            channelsOverview,
            messsagesOverview
        };
    }
}
