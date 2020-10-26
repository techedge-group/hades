import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAccountResolver } from './create-account.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { IamCreateAccountInput } from './../../../../graphql';

describe('CreateAccountResolver', () => 
{
    let resolver: CreateAccountResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAccountResolver,
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

        resolver    = module.get<CreateAccountResolver>(CreateAccountResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateAccountResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateAccountResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an account created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main(<IamCreateAccountInput>accounts[0])).toBe(accounts[0]);
        });
    });
});