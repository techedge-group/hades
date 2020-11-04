import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteJobOverviewByIdResolver } from './cci-delete-job-overview-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';

describe('CciDeleteJobOverviewByIdResolver', () => 
{
    let resolver: CciDeleteJobOverviewByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciDeleteJobOverviewByIdResolver,
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

        resolver    = module.get<CciDeleteJobOverviewByIdResolver>(CciDeleteJobOverviewByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciDeleteJobOverviewByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciDeleteJobOverviewByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobOverview deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsOverview[0])));
            expect(await resolver.main(jobsOverview[0].id)).toBe(jobsOverview[0]);
        });
    });
});