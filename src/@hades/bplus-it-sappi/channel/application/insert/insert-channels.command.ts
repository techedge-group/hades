export class InsertChannelsCommand 
{
    constructor(
        public readonly channels: {
            id: string,
            tenantId: string,
            systemId: string,
            party?: string,
            component: string,
            name: string,
            flowParty: string,
            flowComponent: string,
            flowInterfaceName: string,
            flowInterfaceNamespace: string,
            adapterType?: string,
            direction: string,
            transportProtocol?: string,
            messageProtocol?: string,
            adapterEngineName?: string,
            url?: string,
            username?: string,
            remoteHost?: string,
            remotePort?: number,
            directory?: string,
            fileSchema?: string,
            proxyHost?: string,
            proxyPort?: number,
            destination?: string,
            adapterStatus: string,
            softwareComponentName?: string,
            responsibleUserAccountName?: string,
            lastChangeUserAccount?: string,
            lastChangedAt?: string,
            
        } []
    ) {}
}