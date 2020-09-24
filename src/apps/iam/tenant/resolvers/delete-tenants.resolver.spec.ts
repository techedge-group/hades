import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteTenantsResolver } from './delete-tenants.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';

describe('DeleteTenantsResolver', () => 
{
    let resolver: DeleteTenantsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteTenantsResolver,
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

        resolver    = module.get<DeleteTenantsResolver>(DeleteTenantsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('DeleteTenantsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('DeleteTenantsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenants deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants)));
            expect(await resolver.main()).toBe(tenants);
        });
    });
});