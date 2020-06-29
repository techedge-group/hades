import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { BplusItSappiModels, BplusItSappiHandlers, BplusItSappiServices, BplusItSappiRepositories, BplusItSappiSagas } from '@hades/bplus-it-sappi';
import { BplusItSappiSystemControllers, BplusItSappiSystemResolvers } from './system';
import { BplusItSappiExecutionControllers, BplusItSappiExecutionResolvers } from './execution';
import { BplusItSappiDataLakeControllers, BplusItSappiDataLakeResolvers } from './data-lake';
import { BplusItSappiJobControllers, BplusItSappiJobResolvers } from './job';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...BplusItSappiModels])
    ],
    controllers: [
        ...BplusItSappiSystemControllers,
        ...BplusItSappiExecutionControllers,
        ...BplusItSappiDataLakeControllers,
        ...BplusItSappiJobControllers
    ],
    providers: [
        ...BplusItSappiHandlers,
        ...BplusItSappiServices,
        ...BplusItSappiRepositories,
        ...BplusItSappiSagas,
        ...BplusItSappiSystemResolvers,
        ...BplusItSappiExecutionResolvers,
        ...BplusItSappiDataLakeResolvers,
        ...BplusItSappiJobResolvers
    ]
})
export class BplusItSappiModule {}
