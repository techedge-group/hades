import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelHash extends StringValueObject 
{
    public readonly type: 'ChannelHash';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelHash',
            nullable: false,
            undefinable: false,
            length: 40,            
        }, validationRules));
    }
}