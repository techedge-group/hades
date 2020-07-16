import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertMessagesOverviewResolver } from './insert-messages-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';
import { BplusItSappiCreateMessageOverviewInput } from './../../../../../src/graphql';

describe('InsertMessagesOverviewResolver', () => 
{
    let resolver: InsertMessagesOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertMessagesOverviewResolver,
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

        resolver    = module.get<InsertMessagesOverviewResolver>(InsertMessagesOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertMessagesOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertMessagesOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an messagesOverview created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateMessageOverviewInput[]>messagesOverview)).toBe(true);
        });
    });
});