import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IExecutionRepository } from './../../domain/execution.repository';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionSystemId, 
    ExecutionType, 
    ExecutionMonitoringStartAt, 
    ExecutionMonitoringEndAt, 
    ExecutionExecutedAt, 
    ExecutionCreatedAt, 
    ExecutionUpdatedAt, 
    ExecutionDeletedAt
    
} from '@hades/bplus-it-sappi/execution/domain/value-objects';
import { BplusItSappiExecution } from './../../domain/execution.entity';
import { executions } from './../seeds/execution.seed';

@Injectable()
export class MockExecutionRepository implements IExecutionRepository
{
    public readonly repository: any;
    public readonly entityName: string = 'BplusItSappiExecution';
    public collectionSource: BplusItSappiExecution[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(execution => execution.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>executions)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiExecution.register(
                    new ExecutionId(itemCollection.id),
                    new ExecutionTenantId(itemCollection.tenantId),
                    new ExecutionSystemId(itemCollection.systemId),
                    new ExecutionType(itemCollection.type),
                    new ExecutionMonitoringStartAt(itemCollection.monitoringStartAt),
                    new ExecutionMonitoringEndAt(itemCollection.monitoringEndAt),
                    new ExecutionExecutedAt(itemCollection.executedAt),
                    new ExecutionCreatedAt(itemCollection.createdAt),
                    new ExecutionUpdatedAt(itemCollection.updatedAt),
                    new ExecutionDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiExecution>>
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
    
    async create(execution: BplusItSappiExecution): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === execution.id.value)) throw new ConflictException(`Error to create ${this.entityName}, the id ${execution.id.value} already exist in database`);

        // create deletedAt null 
        execution.deletedAt = new ExecutionDeletedAt(null);

        this.collectionSource.push(execution);
    }

    async insert(execution: BplusItSappiExecution[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiExecution> 
    {
        const response = this.collectionSource.filter(entity => {
            let result = true;
            for (const queryStatement of queryStatements)
            {
                result = entity[queryStatement.column].value === queryStatement.value
            }
            return result;
        });

        const entity = response[0];

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async findById(id: UuidValueObject): Promise<BplusItSappiExecution>
    {
        const entity = this.collectionSource.find(execution => execution.id.value === id.value);

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiExecution[]> 
    {
        return this.collectionSource;
    }

    async update(entity: BplusItSappiExecution): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity.id);

        this.collectionSource.map(execution => {
            if (execution.id.value === entity.id.value) return entity;
            return execution;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);

        this.collectionSource.filter(execution => execution.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}