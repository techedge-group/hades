import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateAccessTokenCommandHandler } from './update-access-token.command-handler';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { UpdateAccessTokenCommand } from './update-access-token.command';
import { UpdateAccessTokenService } from './update-access-token.service';

describe('UpdateAccessTokenCommandHandler', () => 
{
    let commandHandler: UpdateAccessTokenCommandHandler;
    let service: UpdateAccessTokenService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAccessTokenCommandHandler,
                {
                    provide: UpdateAccessTokenService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateAccessTokenCommandHandler>(UpdateAccessTokenCommandHandler);
        service         = module.get<UpdateAccessTokenService>(UpdateAccessTokenService);
    });

    describe('main', () => 
    {
        test('UpdateAccessTokenCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an accessToken created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateAccessTokenCommand(
                    accessTokens[0].id,
                    accessTokens[0].clientId,
                    accessTokens[0].token,
                    accessTokens[0].name,
                    accessTokens[0].isRevoked,
                    accessTokens[0].expiresAt,
                    
                )
            )).toBe(undefined);
        });
    });
});