import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    DataLakeId, 
    DataLakeData, 
    DataLakeCreatedAt, 
    DataLakeUpdatedAt, 
    DataLakeDeletedAt
    
} from './../../domain/value-objects';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { BplusItSappiDataLake } from './../../domain/data-lake.aggregate';

@Injectable()
export class UpdateDataLakeService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(
        id: DataLakeId,
        data?: DataLakeData,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const dataLake = BplusItSappiDataLake.register(
            id,
            data,
            null,
            new DataLakeUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(dataLake);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const dataLakeRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        dataLakeRegister.updated(dataLake); // apply event to model events
        dataLakeRegister.commit(); // commit all events of model
    }
}