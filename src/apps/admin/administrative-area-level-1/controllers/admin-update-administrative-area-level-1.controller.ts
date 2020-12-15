import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateAdministrativeAreaLevel1Dto } from './../dto/update-administrative-area-level-1.dto';
import { AdministrativeAreaLevel1Dto } from './../dto/administrative-area-level-1.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateAdministrativeAreaLevel1Command } from '@hades/admin/administrative-area-level-1/application/update/update-administrative-area-level-1.command';
import { FindAdministrativeAreaLevel1ByIdQuery } from '@hades/admin/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';

@ApiTags('[admin] administrative-area-level-1')
@Controller('admin/administrative-area-level-1')
@Permissions('admin.administrativeAreaLevel1.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminUpdateAdministrativeAreaLevel1Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-area-level-1' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AdministrativeAreaLevel1Dto})
    async main(
        @Body() payload: UpdateAdministrativeAreaLevel1Dto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel1Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(payload.id, constraint, { timezone }));
    }
}