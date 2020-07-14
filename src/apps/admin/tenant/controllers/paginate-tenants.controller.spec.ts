import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateTenantsController } from './paginate-tenants.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/admin/tenant/infrastructure/seeds/tenant.seed'

describe('PaginateTenantsController', () => 
{
    let controller: PaginateTenantsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateTenantsController
            ],
            providers: [
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

        controller  = module.get<PaginateTenantsController>(PaginateTenantsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateTenantsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateTenantsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a tenants', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants)));
            expect(await controller.main([], [])).toBe(tenants);
        });
    });
});