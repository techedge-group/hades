import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertPermissionsCommand } from './insert-permissions.command';
import { InsertPermissionsService } from './insert-permissions.service';
import { 
    PermissionId, 
    PermissionModuleId, 
    PermissionName
    
} from './../../domain/value-objects';

@CommandHandler(InsertPermissionsCommand)
export class InsertPermissionsCommandHandler implements ICommandHandler<InsertPermissionsCommand>
{
    constructor(
        private readonly insertPermissionsService: InsertPermissionsService
    ) { }

    async execute(command: InsertPermissionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertPermissionsService.main(
            command.permissions
                .map(permission => { 
                    return {
                        id: new PermissionId(permission.id),
                        moduleId: new PermissionModuleId(permission.moduleId),
                        name: new PermissionName(permission.name),
                        
                    }
                })
        );
    }
}