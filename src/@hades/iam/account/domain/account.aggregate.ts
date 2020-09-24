import { AggregateRoot } from '@nestjs/cqrs';
import { 
    AccountId,
    AccountType,
    AccountName,
    AccountIsActive,
    AccountClientId,
    AccountApplicationCodes,
    AccountPermissions,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt
    
} from './value-objects';
import { CreatedAccountEvent } from './../application/events/created-account.event';
import { UpdatedAccountEvent } from './../application/events/updated-account.event';
import { DeletedAccountEvent } from './../application/events/deleted-account.event';
import { IamUser } from '@hades/iam/user/domain/user.aggregate';



import { IamRole } from '@hades/iam/role/domain/role.aggregate';
import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';

export class IamAccount extends AggregateRoot
{
    id: AccountId;
    type: AccountType;
    name: AccountName;
    isActive: AccountIsActive;
    clientId: AccountClientId;
    applicationCodes: AccountApplicationCodes;
    permissions: AccountPermissions;
    data: AccountData;
    roleIds: AccountRoleIds;
    tenantIds: AccountTenantIds;
    createdAt: AccountCreatedAt;
    updatedAt: AccountUpdatedAt;
    deletedAt: AccountDeletedAt;
    
    // eager relationship
    
    user: IamUser;
    
    
    
    roles: IamRole[];
    tenants: IamTenant[];
    
    constructor(id?: AccountId, type?: AccountType, name?: AccountName, isActive?: AccountIsActive, clientId?: AccountClientId, applicationCodes?: AccountApplicationCodes, permissions?: AccountPermissions, data?: AccountData, roleIds?: AccountRoleIds, tenantIds?: AccountTenantIds, createdAt?: AccountCreatedAt, updatedAt?: AccountUpdatedAt, deletedAt?: AccountDeletedAt, user?: IamUser, roles?: IamRole[], tenants?: IamTenant[], )
    {
        super();
        
        this.id = id;
        this.type = type;
        this.name = name;
        this.isActive = isActive;
        this.clientId = clientId;
        this.applicationCodes = applicationCodes;
        this.permissions = permissions;
        this.data = data;
        this.roleIds = roleIds;
        this.tenantIds = tenantIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
        // eager relationship
        
        this.user = user;
        
        
        
        this.roles = roles;
        this.tenants = tenants;
        
    }

    static register (id: AccountId, type: AccountType, name: AccountName, isActive: AccountIsActive, clientId: AccountClientId, applicationCodes: AccountApplicationCodes, permissions: AccountPermissions, data: AccountData, roleIds: AccountRoleIds, tenantIds: AccountTenantIds, createdAt: AccountCreatedAt, updatedAt: AccountUpdatedAt, deletedAt: AccountDeletedAt, user?: IamUser, roles?: IamRole[], tenants?: IamTenant[], ): IamAccount
    {
        return new IamAccount(id, type, name, isActive, clientId, applicationCodes, permissions, data, roleIds, tenantIds, createdAt, updatedAt, deletedAt, user, roles, tenants, );
    }

    created(account: IamAccount): void
    {
        this.apply(
            new CreatedAccountEvent(
                account.id.value,
                account.type.value,
                account.name.value,
                account.isActive.value,
                account.clientId.value,
                account.applicationCodes.value,
                account.permissions.value,
                account.data?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
                
            )
        );
    }

    updated(account: IamAccount): void
    {
        this.apply(
            new UpdatedAccountEvent(
                account.id.value,
                account.type?.value,
                account.name?.value,
                account.isActive?.value,
                account.clientId?.value,
                account.applicationCodes?.value,
                account.permissions?.value,
                account.data?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
                
            )
        );
    }

    deleted(account: IamAccount): void
    {
        this.apply(
            new DeletedAccountEvent(
                account.id.value,
                account.type.value,
                account.name.value,
                account.isActive.value,
                account.clientId.value,
                account.applicationCodes.value,
                account.permissions.value,
                account.data?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            type: this.type.value,
            name: this.name.value,
            isActive: this.isActive.value,
            clientId: this.clientId.value,
            applicationCodes: this.applicationCodes.value,
            permissions: this.permissions.value,
            data: this.data?.value,
            roleIds: this.roleIds?.value,
            tenantIds: this.tenantIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
            // eager relationship
            
            user: this.user?.toDTO(),
            
            
            
            roles: this.roles?.map(item => item.toDTO()),
            tenants: this.tenants?.map(item => item.toDTO()),
            
        }
    }
}
