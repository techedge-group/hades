import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreatePermissionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreatePermissionCommand } from '@hades/admin/permission/application/create/create-permission.command';
import { FindPermissionByIdQuery } from '@hades/admin/permission/application/find/find-permission-by-id.query';

@Resolver()
export class CreatePermissionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreatePermission')
    async main(@Args('payload') payload: AdminCreatePermissionInput)
    {
        await this.commandBus.dispatch(new CreatePermissionCommand(
            payload.id,
            payload.moduleId,
            payload.name,
            
        ));
        
        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id));
    }
}