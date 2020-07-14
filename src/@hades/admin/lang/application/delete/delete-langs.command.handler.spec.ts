import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteLangsCommandHandler } from './delete-langs.command-handler';
import { DeleteLangsCommand } from './delete-langs.command';
import { DeleteLangsService } from './delete-langs.service';

describe('DeleteLangsCommandHandler', () => 
{
    let commandHandler: DeleteLangsCommandHandler;
    let service: DeleteLangsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteLangsCommandHandler,
                {
                    provide: DeleteLangsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteLangsCommandHandler>(DeleteLangsCommandHandler);
        service         = module.get<DeleteLangsService>(DeleteLangsService);
    });

    it('DeleteLangsCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('DeleteLangsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteLangsCommand()
            )).toBe(undefined);
        });
    });
});