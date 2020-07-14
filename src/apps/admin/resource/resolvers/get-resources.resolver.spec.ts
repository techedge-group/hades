import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetResourcesResolver } from './get-resources.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';

describe('GetResourcesResolver', () => 
{
    let resolver:   GetResourcesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetResourcesResolver,
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

        resolver    = module.get<GetResourcesResolver>(GetResourcesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('GetResourcesResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        it('GetResourcesResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        it('should return a resources', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(resources)));
            expect(await resolver.main([])).toBe(resources);
        });
    });
});