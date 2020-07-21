import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { tenants } from '@hades/admin/tenant/infrastructure/seeds/tenant.seed';
import { DeleteTenantByIdService } from './delete-tenant-by-id.service';
import { TenantId } from './../../domain/value-objects';
import { ITenantRepository } from '../../domain/tenant.repository';
import { MockTenantRepository } from '../../infrastructure/mock/mock-tenant.repository';

describe('DeleteTenantByIdService', () => 
{
    let service: DeleteTenantByIdService;
    let repository: ITenantRepository;
    let mockRepository: MockTenantRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteTenantByIdService,
                MockTenantRepository,
                { 
                    provide: ITenantRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteTenantByIdService);
        repository      = module.get(ITenantRepository);
        mockRepository  = module.get(MockTenantRepository);
    });

    describe('main', () => 
    {
        it('DeleteTenantByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete tenant and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new TenantId(tenants[0].id)
            )).toBe(undefined);
        });
    });
});