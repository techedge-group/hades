import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    RoleId, 
    RoleTenantId, 
    RoleName, 
    RoleCreatedAt, 
    RoleUpdatedAt, 
    RoleDeletedAt
    
} from './../../domain/value-objects';
import { IRoleRepository } from './../../domain/role.repository';
import { BplusItSappiRole } from './../../domain/role.aggregate';

@Injectable()
export class CreateRoleService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository
    ) {}

    public async main(
        id: RoleId,
        tenantId: RoleTenantId,
        name: RoleName,
        
    ): Promise<void>
    {
        // create object with factory pattern
        const role = BplusItSappiRole.register(
            id,
            tenantId,
            name,
            new RoleCreatedAt(Utils.nowTimestamp()),
            new RoleUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(role);

        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const roleRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        roleRegister.created(role); // apply event to model events
        roleRegister.commit(); // commit all events of model
    }
}