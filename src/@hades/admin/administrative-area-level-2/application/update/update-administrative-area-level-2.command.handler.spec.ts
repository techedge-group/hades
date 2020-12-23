import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateAdministrativeAreaLevel2CommandHandler } from './update-administrative-area-level-2.command-handler';
import { administrativeAreasLevel2 } from '@hades/admin/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { UpdateAdministrativeAreaLevel2Command } from './update-administrative-area-level-2.command';
import { UpdateAdministrativeAreaLevel2Service } from './update-administrative-area-level-2.service';

describe('UpdateAdministrativeAreaLevel2CommandHandler', () =>
{
    let commandHandler: UpdateAdministrativeAreaLevel2CommandHandler;
    let service: UpdateAdministrativeAreaLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAdministrativeAreaLevel2CommandHandler,
                {
                    provide: UpdateAdministrativeAreaLevel2Service,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateAdministrativeAreaLevel2CommandHandler>(UpdateAdministrativeAreaLevel2CommandHandler);
        service         = module.get<UpdateAdministrativeAreaLevel2Service>(UpdateAdministrativeAreaLevel2Service);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreaLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAdministrativeAreaLevel2Command(
                    administrativeAreasLevel2[0].id,
                    administrativeAreasLevel2[0].countryCommonId,
                    administrativeAreasLevel2[0].administrativeAreaLevel1Id,
                    administrativeAreasLevel2[0].code,
                    administrativeAreasLevel2[0].customCode,
                    administrativeAreasLevel2[0].name,
                    administrativeAreasLevel2[0].slug,
                    administrativeAreasLevel2[0].latitude,
                    administrativeAreasLevel2[0].longitude,
                    administrativeAreasLevel2[0].zoom,
                )
            )).toBe(undefined);
        });
    });
});