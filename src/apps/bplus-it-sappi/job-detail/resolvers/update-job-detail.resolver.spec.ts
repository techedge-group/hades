import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateJobDetailResolver } from './update-job-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';
import { BplusItSappiUpdateJobDetailInput } from './../../../../../src/graphql';

describe('UpdateJobDetailResolver', () => 
{
    let resolver: UpdateJobDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateJobDetailResolver,
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

        resolver  = module.get<UpdateJobDetailResolver>(UpdateJobDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateJobDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateJobDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a jobDetail created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsDetail[0])));
            expect(await resolver.main(<BplusItSappiUpdateJobDetailInput>jobsDetail[0])).toBe(jobsDetail[0]);
        });
    });
});