import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateApplicationsController } from './o-auth-paginate-applications.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthPaginateApplicationsController', () => 
{
    let controller: OAuthPaginateApplicationsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthPaginateApplicationsController
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

        controller  = module.get<OAuthPaginateApplicationsController>(OAuthPaginateApplicationsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OAuthPaginateApplicationsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a applications', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications)));
            expect(await controller.main()).toBe(applications);
        });
    });
});