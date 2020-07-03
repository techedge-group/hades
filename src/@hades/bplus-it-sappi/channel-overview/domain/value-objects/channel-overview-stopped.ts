import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelOverviewStopped extends IntValueObject 
{
    public readonly type: 'ChannelOverviewStopped';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewStopped',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}