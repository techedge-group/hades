import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailTenantId extends UuidValueObject
{
    public readonly type: 'ChannelDetailTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailTenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}