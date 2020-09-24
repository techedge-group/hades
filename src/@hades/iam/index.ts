import { IamBoundedContextHandlers, IamBoundedContextServices, IamBoundedContextModel, IBoundedContextRepository, SequelizeBoundedContextRepository, BoundedContextSagas } from './bounded-context';
import { IamPermissionHandlers, IamPermissionServices, IamPermissionModel, IPermissionRepository, SequelizePermissionRepository, PermissionSagas, IamPermissionsRolesModel } from './permission';
import { IamRoleHandlers, IamRoleServices, IamRoleModel, IRoleRepository, SequelizeRoleRepository, RoleSagas, IamRolesAccountsModel } from './role';
import { IamAccountHandlers, IamAccountServices, IamAccountModel, IAccountRepository, SequelizeAccountRepository, AccountSagas } from './account';
import { IamTenantHandlers, IamTenantServices, IamTenantModel, ITenantRepository, SequelizeTenantRepository, TenantSagas, IamTenantsAccountsModel } from './tenant';
import { IamUserHandlers, IamUserServices, IamUserModel, IUserRepository, SequelizeUserRepository, UserSagas } from './user';

export const IamHandlers = [
    ...IamBoundedContextHandlers,
    ...IamPermissionHandlers,
    ...IamRoleHandlers,
    ...IamAccountHandlers,
    ...IamTenantHandlers,
    ...IamUserHandlers
];
export const IamServices = [
    ...IamBoundedContextServices,
    ...IamPermissionServices,
    ...IamRoleServices,
    ...IamAccountServices,
    ...IamTenantServices,
    ...IamUserServices
];
export const IamModels = [
    IamBoundedContextModel,
    IamPermissionModel,
    IamPermissionsRolesModel,
    IamRoleModel,
    IamRolesAccountsModel,
    IamAccountModel,
    IamTenantModel,
    IamTenantsAccountsModel,
    IamUserModel
];
export const IamRepositories = [
    {
        provide: IBoundedContextRepository,
        useClass: SequelizeBoundedContextRepository
    },
    {
        provide: IPermissionRepository,
        useClass: SequelizePermissionRepository
    },
    {
        provide: IRoleRepository,
        useClass: SequelizeRoleRepository
    },
    {
        provide: IAccountRepository,
        useClass: SequelizeAccountRepository
    },
    {
        provide: ITenantRepository,
        useClass: SequelizeTenantRepository
    },
    {
        provide: IUserRepository,
        useClass: SequelizeUserRepository
    }
];
export const IamSagas = [
    BoundedContextSagas,
    PermissionSagas,
    RoleSagas,
    AccountSagas,
    TenantSagas,
    UserSagas
];