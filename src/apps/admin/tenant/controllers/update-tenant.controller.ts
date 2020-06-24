import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { UpdateTenantDto } from './../dto/update-tenant.dto';
import { TenantDto } from './../dto/tenant.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateTenantCommand } from '@hades/admin/tenant/application/update/update-tenant.command';
import { FindTenantByIdQuery } from '@hades/admin/tenant/application/find/find-tenant-by-id.query';

@ApiTags('tenant')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: TenantDto})
@Controller('admin/tenant')
export class UpdateTenantController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    async main(@Body() payload: UpdateTenantDto)
    {
        await this.commandBus.dispatch(new UpdateTenantCommand(
            payload.id,
            payload.name,
            payload.code,
            payload.logo,
            payload.isActive,
            payload.data,
            
        ));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id));
    }
}