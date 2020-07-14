import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IResourceRepository } from './../../domain/resource.repository';
import { AdminResource } from './../../domain/resource.aggregate';
import { ResourceMapper } from './../../domain/resource.mapper';
import { AdminResourceModel } from './sequelize-resource.model';

@Injectable()
export class SequelizeResourceRepository extends SequelizeRepository<AdminResource> implements IResourceRepository
{
    public readonly aggregateName: string = 'AdminResource';
    public readonly mapper: ResourceMapper = new ResourceMapper();

    constructor(
        @InjectModel(AdminResourceModel)
        public readonly repository: typeof AdminResourceModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}