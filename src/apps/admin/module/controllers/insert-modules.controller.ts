import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateModuleDto } from './../dto/create-module.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertModulesCommand } from '@hades/admin/module/application/insert/insert-modules.command';

@ApiTags('[admin] module')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('admin/modules')
export class InsertModulesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert modules in batch' })
    @ApiBody({ 
        type: [CreateModuleDto]
    })
    async main(@Body() payload: CreateModuleDto[])
    {
        await this.commandBus.dispatch(new InsertModulesCommand(payload));
    }
}