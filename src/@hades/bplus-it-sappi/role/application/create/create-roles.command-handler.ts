import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRolesCommand } from './create-roles.command';
import { CreateRolesService } from './create-roles.service';
import { 
    RoleId, 
    RoleTenantId, 
    RoleTenantCode, 
    RoleName
    
} from './../../domain/value-objects';

@CommandHandler(CreateRolesCommand)
export class CreateRolesCommandHandler implements ICommandHandler<CreateRolesCommand>
{
    constructor(
        private readonly createRolesService: CreateRolesService
    ) { }

    async execute(command: CreateRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRolesService.main(
            command.roles
                .map(role => { 
                    return {
                        id: new RoleId(role.id),
                        tenantId: new RoleTenantId(role.tenantId),
                        tenantCode: new RoleTenantCode(role.tenantCode),
                        name: new RoleName(role.name),
                        
                    }
                })
        );
    }
}