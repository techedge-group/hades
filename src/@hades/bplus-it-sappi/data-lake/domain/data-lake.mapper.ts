import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiDataLake } from './data-lake.aggregate';
import { DataLakeResponse } from './data-lake.response';
import { 
    DataLakeId, 
    DataLakeTenantId, 
    DataLakeTenantCode, 
    DataLakeData, 
    DataLakeCreatedAt, 
    DataLakeUpdatedAt, 
    DataLakeDeletedAt
    
} from './value-objects';

export class DataLakeMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param dataLake
     */
    mapObjectToAggregate(dataLake: ObjectLiteral): BplusItSappiDataLake
    {
        return this.makeAggregate(dataLake);
    }

    /**
     * Map array of objects to array aggregates
     * @param dataLakes 
     */
    mapObjectsToAggregates(dataLakes: ObjectLiteral[]): BplusItSappiDataLake[]
    {
        return dataLakes.map(dataLake  => this.makeAggregate(dataLake ));
    }

    /**
     * Map aggregate to response
     * @param dataLake 
     */
    mapAggregateToResponse(dataLake: BplusItSappiDataLake): DataLakeResponse
    {
        return this.makeResponse(dataLake);
    }

    /**
     * Map array of aggregates to array responses
     * @param dataLakes
     */
    mapAggregatesToResponses(dataLakes: BplusItSappiDataLake[]): DataLakeResponse[]
    {
        return dataLakes.map(dataLake => this.makeResponse(dataLake));
    }

    private makeAggregate(dataLake: ObjectLiteral): BplusItSappiDataLake
    {
        return BplusItSappiDataLake.register(
            new DataLakeId(dataLake.id),
            new DataLakeTenantId(dataLake.tenantId),
            new DataLakeTenantCode(dataLake.tenantCode),
            new DataLakeData(dataLake.data),
            new DataLakeCreatedAt(dataLake.createdAt),
            new DataLakeUpdatedAt(dataLake.updatedAt),
            new DataLakeDeletedAt(dataLake.deletedAt),
              
        );
    }

    private makeResponse(dataLake: BplusItSappiDataLake): DataLakeResponse
    {
        return new DataLakeResponse(
            dataLake.id.value,
            dataLake.tenantId.value,
            dataLake.tenantCode.value,
            dataLake.data.value,
            dataLake.createdAt.value,
            dataLake.updatedAt.value,
            dataLake.deletedAt.value,
            
        );
    }
}