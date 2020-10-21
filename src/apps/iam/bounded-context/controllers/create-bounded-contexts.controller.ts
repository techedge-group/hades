import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';
import { CreateBoundedContextDto } from './../dto/create-bounded-context.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts')
@Permissions('iam.boundedContext.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateBoundedContextsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create bounded-contexts in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [BoundedContextDto] })
    @ApiBody({ type: [CreateBoundedContextDto] })
    async main(@Body() payload: CreateBoundedContextDto[], )
    {
        await this.commandBus.dispatch(new CreateBoundedContextsCommand(payload));
    }
}