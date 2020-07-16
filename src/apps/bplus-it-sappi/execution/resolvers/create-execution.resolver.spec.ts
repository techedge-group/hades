import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateExecutionResolver } from './create-execution.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed';
import { BplusItSappiCreateExecutionInput } from './../../../../../src/graphql';

describe('CreateExecutionResolver', () => 
{
    let resolver: CreateExecutionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateExecutionResolver,
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

        resolver    = module.get<CreateExecutionResolver>(CreateExecutionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateExecutionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateExecutionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an execution created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(executions[0])));
            expect(await resolver.main(<BplusItSappiCreateExecutionInput>executions[0])).toBe(executions[0]);
        });
    });
});