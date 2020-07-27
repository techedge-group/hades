import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channels } from '@hades/bplus-it-sappi/channel/infrastructure/seeds/channel.seed';
import { UpdateChannelService } from './update-channel.service';
import { 
    ChannelId, 
    ChannelTenantId, 
    ChannelTenantCode, 
    ChannelSystemId, 
    ChannelSystemName, 
    ChannelParty, 
    ChannelComponent, 
    ChannelName, 
    ChannelFlowId, 
    ChannelFlowParty, 
    ChannelFlowComponent, 
    ChannelFlowInterfaceName, 
    ChannelFlowInterfaceNamespace, 
    ChannelVersion, 
    ChannelAdapterType, 
    ChannelDirection, 
    ChannelTransportProtocol, 
    ChannelMessageProtocol, 
    ChannelAdapterEngineName, 
    ChannelUrl, 
    ChannelUsername, 
    ChannelRemoteHost, 
    ChannelRemotePort, 
    ChannelDirectory, 
    ChannelFileSchema, 
    ChannelProxyHost, 
    ChannelProxyPort, 
    ChannelDestination, 
    ChannelAdapterStatus, 
    ChannelSoftwareComponentName, 
    ChannelResponsibleUserAccountName, 
    ChannelLastChangeUserAccount, 
    ChannelLastChangedAt, 
    ChannelCreatedAt, 
    ChannelUpdatedAt, 
    ChannelDeletedAt
    
} from './../../domain/value-objects';
import { IChannelRepository } from './../../domain/channel.repository';
import { MockChannelRepository } from './../../infrastructure/mock/mock-channel.repository';

describe('UpdateChannelService', () => 
{
    let service: UpdateChannelService;
    let repository: IChannelRepository;
    let mockRepository: MockChannelRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateChannelService,
                MockChannelRepository,
                { 
                    provide: IChannelRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateChannelService);
        repository      = module.get(IChannelRepository);
        mockRepository  = module.get(MockChannelRepository);
    });

    describe('main', () => 
    {
        test('UpdateChannelService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a channel and emit event', async () => 
        {
            expect(await service.main(
                new ChannelId(channels[0].id),
                new ChannelTenantId(channels[0].tenantId),
                new ChannelTenantCode(channels[0].tenantCode),
                new ChannelSystemId(channels[0].systemId),
                new ChannelSystemName(channels[0].systemName),
                new ChannelParty(channels[0].party),
                new ChannelComponent(channels[0].component),
                new ChannelName(channels[0].name),
                new ChannelFlowId(channels[0].flowId),
                new ChannelFlowParty(channels[0].flowParty),
                new ChannelFlowComponent(channels[0].flowComponent),
                new ChannelFlowInterfaceName(channels[0].flowInterfaceName),
                new ChannelFlowInterfaceNamespace(channels[0].flowInterfaceNamespace),
                new ChannelVersion(channels[0].version),
                new ChannelAdapterType(channels[0].adapterType),
                new ChannelDirection(channels[0].direction),
                new ChannelTransportProtocol(channels[0].transportProtocol),
                new ChannelMessageProtocol(channels[0].messageProtocol),
                new ChannelAdapterEngineName(channels[0].adapterEngineName),
                new ChannelUrl(channels[0].url),
                new ChannelUsername(channels[0].username),
                new ChannelRemoteHost(channels[0].remoteHost),
                new ChannelRemotePort(channels[0].remotePort),
                new ChannelDirectory(channels[0].directory),
                new ChannelFileSchema(channels[0].fileSchema),
                new ChannelProxyHost(channels[0].proxyHost),
                new ChannelProxyPort(channels[0].proxyPort),
                new ChannelDestination(channels[0].destination),
                new ChannelAdapterStatus(channels[0].adapterStatus),
                new ChannelSoftwareComponentName(channels[0].softwareComponentName),
                new ChannelResponsibleUserAccountName(channels[0].responsibleUserAccountName),
                new ChannelLastChangeUserAccount(channels[0].lastChangeUserAccount),
                new ChannelLastChangedAt(channels[0].lastChangedAt),
                
            )).toBe(undefined);
        });
    });
});