import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelVersion extends StringValueObject 
{
    public readonly type: 'ChannelVersion';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelVersion',
            nullable: false,
            undefinable: false,
            maxLength: 20,            
        }, validationRules));
    }
}