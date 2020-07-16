import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { 
    JobDetailId, 
    JobDetailTenantId, 
    JobDetailSystemId, 
    JobDetailSystemName, 
    JobDetailExecutionId, 
    JobDetailExecutionType, 
    JobDetailExecutionExecutedAt, 
    JobDetailExecutionMonitoringStartAt, 
    JobDetailExecutionMonitoringEndAt, 
    JobDetailStatus, 
    JobDetailName, 
    JobDetailReturnCode, 
    JobDetailNode, 
    JobDetailUser, 
    JobDetailCreatedAt, 
    JobDetailUpdatedAt, 
    JobDetailDeletedAt
    
} from '@hades/bplus-it-sappi/job-detail/domain/value-objects';
import { BplusItSappiJobDetail } from './../../domain/job-detail.aggregate';
import { jobsDetail } from './../seeds/job-detail.seed';

@Injectable()
export class MockJobDetailRepository implements IJobDetailRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'BplusItSappiJobDetail';
    public collectionSource: BplusItSappiJobDetail[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(jobDetail => jobDetail.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>jobsDetail)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiJobDetail.register(
                    new JobDetailId(itemCollection.id),
                    new JobDetailTenantId(itemCollection.tenantId),
                    new JobDetailSystemId(itemCollection.systemId),
                    new JobDetailSystemName(itemCollection.systemName),
                    new JobDetailExecutionId(itemCollection.executionId),
                    new JobDetailExecutionType(itemCollection.executionType),
                    new JobDetailExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new JobDetailExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new JobDetailExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new JobDetailStatus(itemCollection.status),
                    new JobDetailName(itemCollection.name),
                    new JobDetailReturnCode(itemCollection.returnCode),
                    new JobDetailNode(itemCollection.node),
                    new JobDetailUser(itemCollection.user),
                    new JobDetailCreatedAt(itemCollection.createdAt),
                    new JobDetailUpdatedAt(itemCollection.updatedAt),
                    new JobDetailDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiJobDetail>>
    {
        let offset  = 0;
        let limit   = this.collectionSource.length;
        for (const queryStatement of queryStatements)
        {
            if (queryStatement.command === Command.OFFSET)  offset = queryStatement.value;
            if (queryStatement.command === Command.LIMIT)   limit = queryStatement.value;
        }
        return { 
            total   : this.collectionSource.length, 
            count   : this.collectionSource.length, 
            rows    : this.collectionSource.slice(offset,limit)
        };
    }
    
    async create(jobDetail: BplusItSappiJobDetail): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === jobDetail.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${jobDetail.id.value} already exist in database`);

        // create deletedAt null 
        jobDetail.deletedAt = new JobDetailDeletedAt(null);

        this.collectionSource.push(jobDetail);
    }

    async insert(jobDetail: BplusItSappiJobDetail[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiJobDetail> 
    {
        const response = this.collectionSource.filter(aggregate => {
            let result = true;
            for (const queryStatement of queryStatements)
            {
                result = aggregate[queryStatement.column].value === queryStatement.value
            }
            return result;
        });

        const aggregate = response[0];

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async findById(id: UuidValueObject): Promise<BplusItSappiJobDetail>
    {
        const aggregate = this.collectionSource.find(jobDetail => jobDetail.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiJobDetail[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: BplusItSappiJobDetail): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(jobDetail => {
            if (jobDetail.id.value === aggregate.id.value) return aggregate;
            return jobDetail;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(jobDetail => jobDetail.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}