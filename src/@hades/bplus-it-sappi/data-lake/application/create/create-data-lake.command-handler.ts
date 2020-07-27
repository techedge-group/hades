import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDataLakeCommand } from './create-data-lake.command';
import { CreateDataLakeService } from './create-data-lake.service';
import { 
    DataLakeId, 
    DataLakeTenantId, 
    DataLakeTenantCode, 
    DataLakeData
    
} from './../../domain/value-objects';

@CommandHandler(CreateDataLakeCommand)
export class CreateDataLakeCommandHandler implements ICommandHandler<CreateDataLakeCommand>
{
    constructor(
        private readonly createDataLakeService: CreateDataLakeService
    ) { }

    async execute(command: CreateDataLakeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createDataLakeService.main(
            new DataLakeId(command.id),
            new DataLakeTenantId(command.tenantId),
            new DataLakeTenantCode(command.tenantCode),
            new DataLakeData(command.data),
            
        );
    }
}