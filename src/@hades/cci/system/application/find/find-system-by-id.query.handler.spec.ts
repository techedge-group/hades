import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSystemByIdQueryHandler } from './find-system-by-id.query-handler';
import { MockSystemRepository } from '@hades/cci/system/infrastructure/mock/mock-system.repository';
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';
import { ISystemRepository } from '@hades/cci/system/domain/system.repository';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';
import { FindSystemByIdQuery } from './find-system-by-id.query';
import { FindSystemByIdService } from './find-system-by-id.service';

describe('FindSystemByIdQueryHandler', () => 
{
    let queryHandler: FindSystemByIdQueryHandler;
    let service: FindSystemByIdService;
    let repository: MockSystemRepository;
    let mapper: SystemMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSystemByIdQueryHandler,
                {
                    provide: ISystemRepository,
                    useClass: MockSystemRepository
                },
                {
                    provide: FindSystemByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindSystemByIdQueryHandler>(FindSystemByIdQueryHandler);
        service         = module.get<FindSystemByIdService>(FindSystemByIdService);
        repository      = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);
        mapper          = new SystemMapper();
    });

    describe('main', () => 
    {
        test('FindSystemByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an system founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindSystemByIdQuery(
                    systems[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});