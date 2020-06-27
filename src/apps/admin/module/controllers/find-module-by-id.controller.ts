import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindModuleByIdQuery } from '@hades/admin/module/application/find/find-module-by-id.query';

@ApiTags('[admin] module')
@ApiOkResponse({ description: 'The record has been successfully created.', type: ModuleDto})
@Controller('admin/module')
export class FindModuleByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find module by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindModuleByIdQuery(id));
    }
}