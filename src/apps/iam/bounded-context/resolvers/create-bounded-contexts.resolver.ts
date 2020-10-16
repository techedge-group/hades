import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';
import { IamCreateBoundedContextInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateBoundedContextsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateBoundedContexts')
    async main(@Args('payload') payload: IamCreateBoundedContextInput[])
    {
        await this.commandBus.dispatch(new CreateBoundedContextsCommand(payload));
        return true;
    }
}