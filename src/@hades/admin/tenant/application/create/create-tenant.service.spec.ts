import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { tenants } from '@hades/admin/tenant/infrastructure/seeds/tenant.seed';
import { CreateTenantService } from './create-tenant.service';
import { 
    TenantId, 
    TenantName, 
    TenantCode, 
    TenantLogo, 
    TenantIsActive, 
    TenantData
    
} from './../../domain/value-objects';
import { ITenantRepository } from '../../domain/tenant.repository';
import { MockTenantRepository } from '../../infrastructure/mock/mock-tenant.repository';

describe('CreateTenantService', () => 
{
    let service: CreateTenantService;
    let repository: ITenantRepository;
    let mockRepository: MockTenantRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateTenantService,
                MockTenantRepository,
                { 
                    provide: ITenantRepository,
                    useValue: {
                        create: (item) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateTenantService);
        repository      = module.get(ITenantRepository);
        mockRepository  = module.get(MockTenantRepository);
    });

    describe('main', () => 
    {
        test('CreateTenantService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a tenant and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new TenantId(tenants[0].id),
                new TenantName(tenants[0].name),
                new TenantCode(tenants[0].code),
                new TenantLogo(tenants[0].logo),
                new TenantIsActive(tenants[0].isActive),
                new TenantData(tenants[0].data),
                
            )).toBe(undefined);
        });
    });
});