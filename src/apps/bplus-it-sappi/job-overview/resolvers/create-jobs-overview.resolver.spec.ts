import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateJobsOverviewResolver } from './create-jobs-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';
import { BplusItSappiCreateJobOverviewInput } from './../../../../graphql';

describe('CreateJobsOverviewResolver', () => 
{
    let resolver: CreateJobsOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateJobsOverviewResolver,
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

        resolver    = module.get<CreateJobsOverviewResolver>(CreateJobsOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateJobsOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateJobsOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobsOverview created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateJobOverviewInput[]>jobsOverview)).toBe(true);
        });
    });
});