import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailProtocol extends StringValueObject 
{
    public readonly type: 'MessageDetailProtocol';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailProtocol',
            nullable: true,
            undefinable: true,
            maxLength: 20,            
        }, validationRules));
    }
}