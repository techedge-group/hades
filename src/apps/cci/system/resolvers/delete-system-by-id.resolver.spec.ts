import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSystemByIdResolver } from './delete-system-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';

describe('DeleteSystemByIdResolver', () => 
{
    let resolver: DeleteSystemByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSystemByIdResolver,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {},
                    }
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {},
                    }
                },
            ]
        }).compile();

        resolver    = module.get<DeleteSystemByIdResolver>(DeleteSystemByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('DeleteSystemByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('DeleteSystemByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an system deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(systems[0])));
            expect(await resolver.main(systems[0].id)).toBe(systems[0]);
        });
    });
});