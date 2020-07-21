import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed';
import { CreateDataLakeService } from './create-data-lake.service';
import { 
    DataLakeId, 
    DataLakeData
    
} from './../../domain/value-objects';
import { IDataLakeRepository } from '../../domain/data-lake.repository';
import { MockDataLakeRepository } from '../../infrastructure/mock/mock-data-lake.repository';

describe('CreateDataLakeService', () => 
{
    let service: CreateDataLakeService;
    let repository: IDataLakeRepository;
    let mockRepository: MockDataLakeRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateDataLakeService,
                MockDataLakeRepository,
                { 
                    provide: IDataLakeRepository,
                    useValue: {
                        create: (item) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateDataLakeService);
        repository      = module.get(IDataLakeRepository);
        mockRepository  = module.get(MockDataLakeRepository);
    });

    describe('main', () => 
    {
        test('CreateDataLakeService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a dataLake and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new DataLakeId(dataLakes[0].id),
                new DataLakeData(dataLakes[0].data),
                
            )).toBe(undefined);
        });
    });
});