import { BplusItSappiSystemHandlers, BplusItSappiSystemServices, BplusItSappiSystemModel, ISystemRepository, SequelizeSystemRepository, SystemSagas } from './system';
import { BplusItSappiExecutionHandlers, BplusItSappiExecutionServices, BplusItSappiExecutionModel, IExecutionRepository, SequelizeExecutionRepository, ExecutionSagas } from './execution';
import { BplusItSappiDataLakeHandlers, BplusItSappiDataLakeServices, BplusItSappiDataLakeModel, IDataLakeRepository, SequelizeDataLakeRepository, DataLakeSagas } from './data-lake';
import { BplusItSappiJobOverviewHandlers, BplusItSappiJobOverviewServices, BplusItSappiJobOverviewModel, IJobOverviewRepository, SequelizeJobOverviewRepository, JobOverviewSagas } from './job-overview';
import { BplusItSappiChannelOverviewHandlers, BplusItSappiChannelOverviewServices, BplusItSappiChannelOverviewModel, IChannelOverviewRepository, SequelizeChannelOverviewRepository, ChannelOverviewSagas } from './channel-overview';
import { BplusItSappiMessageOverviewHandlers, BplusItSappiMessageOverviewServices, BplusItSappiMessageOverviewModel, IMessageOverviewRepository, SequelizeMessageOverviewRepository, MessageOverviewSagas } from './message-overview';
import { BplusItSappiRoleHandlers, BplusItSappiRoleServices, BplusItSappiRoleModel, IRoleRepository, SequelizeRoleRepository, RoleSagas } from './role';

export const BplusItSappiHandlers = [
    ...BplusItSappiSystemHandlers,
    ...BplusItSappiExecutionHandlers,
    ...BplusItSappiDataLakeHandlers,
    ...BplusItSappiJobOverviewHandlers,
    ...BplusItSappiChannelOverviewHandlers,
    ...BplusItSappiMessageOverviewHandlers,
    ...BplusItSappiRoleHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiSystemServices,
    ...BplusItSappiExecutionServices,
    ...BplusItSappiDataLakeServices,
    ...BplusItSappiJobOverviewServices,
    ...BplusItSappiChannelOverviewServices,
    ...BplusItSappiMessageOverviewServices,
    ...BplusItSappiRoleServices
];
export const BplusItSappiModels = [
    BplusItSappiSystemModel,
    BplusItSappiExecutionModel,
    BplusItSappiDataLakeModel,
    BplusItSappiJobOverviewModel,
    BplusItSappiChannelOverviewModel,
    BplusItSappiMessageOverviewModel,
    BplusItSappiRoleModel
];
export const BplusItSappiRepositories = [
    {
        provide: ISystemRepository,
        useClass: SequelizeSystemRepository
    },
    {
        provide: IExecutionRepository,
        useClass: SequelizeExecutionRepository
    },
    {
        provide: IDataLakeRepository,
        useClass: SequelizeDataLakeRepository
    },
    {
        provide: IJobOverviewRepository,
        useClass: SequelizeJobOverviewRepository
    },
    {
        provide: IChannelOverviewRepository,
        useClass: SequelizeChannelOverviewRepository
    },
    {
        provide: IMessageOverviewRepository,
        useClass: SequelizeMessageOverviewRepository
    },
    {
        provide: IRoleRepository,
        useClass: SequelizeRoleRepository
    }
];
export const BplusItSappiSagas = [
    SystemSagas,
    ExecutionSagas,
    DataLakeSagas,
    JobOverviewSagas,
    ChannelOverviewSagas,
    MessageOverviewSagas,
    RoleSagas
];
