import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetPermissionsService } from './get-permissions.service';
import { IPermissionRepository } from './../../domain/permission.repository';
import { MockPermissionRepository } from './../../infrastructure/mock/mock-permission.repository';

describe('GetPermissionsService', () => 
{
    let service: GetPermissionsService;
    let repository: IPermissionRepository;
    let mockRepository: MockPermissionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetPermissionsService,
                MockPermissionRepository,
                { 
                    provide: IPermissionRepository,
                    useValue: {
                        get: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetPermissionsService);
        repository      = module.get(IPermissionRepository);
        mockRepository  = module.get(MockPermissionRepository);
    });

    describe('main', () => 
    {
        it('GetPermissionsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should get permissions', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main([])).toBe(mockRepository.collectionSource);
        });
    });
});