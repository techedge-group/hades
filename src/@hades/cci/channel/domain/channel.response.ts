
import { TenantResponse } from '@hades/iam/tenant/domain/tenant.response';
import { SystemResponse } from '@hades/cci/system/domain/system.response';



export class ChannelResponse 
{
    constructor(
        public readonly id: string,
        public readonly hash: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly systemId: string,
        public readonly systemName: string,
        public readonly party: string,
        public readonly component: string,
        public readonly name: string,
        public readonly flowHash: string,
        public readonly flowParty: string,
        public readonly flowReceiverParty: string,
        public readonly flowComponent: string,
        public readonly flowReceiverComponent: string,
        public readonly flowInterfaceName: string,
        public readonly flowInterfaceNamespace: string,
        public readonly version: string,
        public readonly adapterType: string,
        public readonly direction: string,
        public readonly transportProtocol: string,
        public readonly messageProtocol: string,
        public readonly adapterEngineName: string,
        public readonly url: string,
        public readonly username: string,
        public readonly remoteHost: string,
        public readonly remotePort: number,
        public readonly directory: string,
        public readonly fileSchema: string,
        public readonly proxyHost: string,
        public readonly proxyPort: number,
        public readonly destination: string,
        public readonly adapterStatus: string,
        public readonly softwareComponentName: string,
        public readonly responsibleUserAccountName: string,
        public readonly lastChangeUserAccount: string,
        public readonly lastChangedAt: string,
        public readonly riInterfaceName: string,
        public readonly riInterfaceNamespace: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
        
        
        public readonly tenant: TenantResponse,
        public readonly system: SystemResponse,
        
        
        
    ) {}
}