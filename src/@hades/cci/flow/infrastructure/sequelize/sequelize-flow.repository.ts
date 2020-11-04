import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IFlowRepository } from './../../domain/flow.repository';
import { CciFlow } from './../../domain/flow.aggregate';
import { FlowMapper } from './../../domain/flow.mapper';
import { CciFlowModel } from './sequelize-flow.model';

@Injectable()
export class SequelizeFlowRepository extends SequelizeRepository<CciFlow, CciFlowModel> implements IFlowRepository
{
    public readonly aggregateName: string = 'CciFlow';
    public readonly mapper: FlowMapper = new FlowMapper();
    public readonly timezoneColumns: string[] = ['lastChangedAt','createdAt','updatedAt','deletedAt'];

    constructor(
        @InjectModel(CciFlowModel)
        public readonly repository: typeof CciFlowModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}