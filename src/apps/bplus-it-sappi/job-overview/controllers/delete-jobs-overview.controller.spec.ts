import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteJobsOverviewController } from './delete-jobs-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';

describe('DeleteJobsOverviewController', () => 
{
    let controller: DeleteJobsOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteJobsOverviewController
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

        controller  = module.get<DeleteJobsOverviewController>(DeleteJobsOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('DeleteJobsOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobsOverview deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsOverview)));
            expect(await controller.main([])).toBe(jobsOverview);
        });
    });
});