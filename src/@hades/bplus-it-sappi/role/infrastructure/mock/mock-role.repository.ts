import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IRoleRepository } from './../../domain/role.repository';
import { 
    RoleId, 
    RoleTenantId, 
    RoleTenantCode, 
    RoleName, 
    RoleCreatedAt, 
    RoleUpdatedAt, 
    RoleDeletedAt
    
} from '@hades/bplus-it-sappi/role/domain/value-objects';
import { BplusItSappiRole } from './../../domain/role.aggregate';
import { roles } from './../seeds/role.seed';

@Injectable()
export class MockRoleRepository implements IRoleRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'BplusItSappiRole';
    public collectionSource: BplusItSappiRole[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(role => role.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>roles)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiRole.register(
                    new RoleId(itemCollection.id),
                    new RoleTenantId(itemCollection.tenantId),
                    new RoleTenantCode(itemCollection.tenantCode),
                    new RoleName(itemCollection.name),
                    new RoleCreatedAt(itemCollection.createdAt),
                    new RoleUpdatedAt(itemCollection.updatedAt),
                    new RoleDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiRole>>
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
    
    async create(role: BplusItSappiRole): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === role.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${role.id.value} already exist in database`);

        // create deletedAt null 
        role.deletedAt = new RoleDeletedAt(null);

        this.collectionSource.push(role);
    }

    async insert(role: BplusItSappiRole[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiRole> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiRole>
    {
        const aggregate = this.collectionSource.find(role => role.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiRole[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: BplusItSappiRole): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(role => {
            if (role.id.value === aggregate.id.value) return aggregate;
            return role;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(role => role.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}