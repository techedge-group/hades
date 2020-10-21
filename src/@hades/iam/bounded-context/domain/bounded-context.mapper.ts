import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { IamBoundedContext } from './bounded-context.aggregate';
import { BoundedContextResponse } from './bounded-context.response';
import { 
    BoundedContextId,
    BoundedContextName,
    BoundedContextRoot,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt
    
} from './value-objects';


import { PermissionMapper } from '@hades/iam/permission/domain/permission.mapper';


export class BoundedContextMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param boundedContext
     */
    mapModelToAggregate(boundedContext: ObjectLiteral): IamBoundedContext
    {
        if (!boundedContext) return;

        return this.makeAggregate(boundedContext);
    }

    /**
     * Map array of objects to array aggregates
     * @param boundedContexts 
     */
    mapModelsToAggregates(boundedContexts: ObjectLiteral[]): IamBoundedContext[]
    {
        if (!Array.isArray(boundedContexts)) return;
        
        return boundedContexts.map(boundedContext  => this.makeAggregate(boundedContext));
    }

    /**
     * Map aggregate to response
     * @param boundedContext 
     */
    mapAggregateToResponse(boundedContext: IamBoundedContext): BoundedContextResponse
    {
        return this.makeResponse(boundedContext);
    }

    /**
     * Map array of aggregates to array responses
     * @param boundedContexts
     */
    mapAggregatesToResponses(boundedContexts: IamBoundedContext[]): BoundedContextResponse[]
    {
        if (!Array.isArray(boundedContexts)) return;

        return boundedContexts.map(boundedContext => this.makeResponse(boundedContext));
    }

    private makeAggregate(boundedContext: ObjectLiteral): IamBoundedContext
    {
        return IamBoundedContext.register(
            new BoundedContextId(boundedContext.id),
            new BoundedContextName(boundedContext.name),
            new BoundedContextRoot(boundedContext.root),
            new BoundedContextSort(boundedContext.sort),
            new BoundedContextIsActive(boundedContext.isActive),
            new BoundedContextCreatedAt(boundedContext.createdAt),
            new BoundedContextUpdatedAt(boundedContext.updatedAt),
            new BoundedContextDeletedAt(boundedContext.deletedAt),
            
            
            
            
            this.options.eagerLoading ? new PermissionMapper({ eagerLoading: false }).mapModelsToAggregates(boundedContext.permissions) : undefined,
            
            
        );
    }

    private makeResponse(boundedContext: IamBoundedContext): BoundedContextResponse
    {
        if (!boundedContext) return;
        
        return new BoundedContextResponse(
            boundedContext.id.value,
            boundedContext.name.value,
            boundedContext.root.value,
            boundedContext.sort.value,
            boundedContext.isActive.value,
            boundedContext.createdAt.value,
            boundedContext.updatedAt.value,
            boundedContext.deletedAt.value,
            
            
            
            
            this.options.eagerLoading ? new PermissionMapper({ eagerLoading: false }).mapAggregatesToResponses(boundedContext.permissions) : undefined,
            
            
        );
    }
}