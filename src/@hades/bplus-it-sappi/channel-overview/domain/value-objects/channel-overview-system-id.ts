import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelOverviewSystemId extends UuidValueObject
{
    public readonly type: 'ChannelOverviewSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewSystemId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}