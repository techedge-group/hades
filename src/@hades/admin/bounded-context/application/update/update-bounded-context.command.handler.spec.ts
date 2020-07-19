import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateBoundedContextCommandHandler } from './update-bounded-contexts.command-handler';
import { boundedContexts } from '@hades/admin/bounded-contexts/infrastructure/seeds/bounded-contexts.seed';
import { UpdateBoundedContextCommand } from './update-bounded-contexts.command';
import { UpdateBoundedContextService } from './update-bounded-contexts.service';

describe('UpdateBoundedContextCommandHandler', () => 
{
    let commandHandler: UpdateBoundedContextCommandHandler;
    let service: UpdateBoundedContextService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateBoundedContextCommandHandler,
                {
                    provide: UpdateBoundedContextService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateBoundedContextCommandHandler>(UpdateBoundedContextCommandHandler);
        service         = module.get<UpdateBoundedContextService>(UpdateBoundedContextService);
    });

    it('UpdateBoundedContextCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateBoundedContextCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return an boundedContext created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateBoundedContextCommand(
                    boundedContexts[0].id,
                    boundedContexts[0].name,
                    boundedContexts[0].root,
                    boundedContexts[0].sort,
                    boundedContexts[0].isActive,
                    
                )
            )).toBe(undefined);
        });
    });
});