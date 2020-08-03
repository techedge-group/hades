import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateModuleCommand } from './create-module.command';
import { CreateModuleService } from './create-module.service';
import { 
    ModuleId, 
    ModuleTenantId, 
    ModuleTenantCode, 
    ModuleSystemId, 
    ModuleSystemName, 
    ModuleChannelId, 
    ModuleChannelParty, 
    ModuleChannelComponent, 
    ModuleChannelName, 
    ModuleFlowId, 
    ModuleFlowParty, 
    ModuleFlowComponent, 
    ModuleFlowInterfaceName, 
    ModuleFlowInterfaceNamespace, 
    ModuleVersion, 
    ModuleParameterGroup, 
    ModuleName, 
    ModuleParameterName, 
    ModuleParameterValue
    
} from './../../domain/value-objects';

@CommandHandler(CreateModuleCommand)
export class CreateModuleCommandHandler implements ICommandHandler<CreateModuleCommand>
{
    constructor(
        private readonly createModuleService: CreateModuleService
    ) { }

    async execute(command: CreateModuleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createModuleService.main(
            new ModuleId(command.id),
            new ModuleTenantId(command.tenantId),
            new ModuleTenantCode(command.tenantCode),
            new ModuleSystemId(command.systemId),
            new ModuleSystemName(command.systemName),
            new ModuleChannelId(command.channelId),
            new ModuleChannelParty(command.channelParty),
            new ModuleChannelComponent(command.channelComponent),
            new ModuleChannelName(command.channelName),
            new ModuleFlowId(command.flowId),
            new ModuleFlowParty(command.flowParty),
            new ModuleFlowComponent(command.flowComponent),
            new ModuleFlowInterfaceName(command.flowInterfaceName),
            new ModuleFlowInterfaceNamespace(command.flowInterfaceNamespace),
            new ModuleVersion(command.version),
            new ModuleParameterGroup(command.parameterGroup),
            new ModuleName(command.name),
            new ModuleParameterName(command.parameterName),
            new ModuleParameterValue(command.parameterValue),
            
        );
    }
}