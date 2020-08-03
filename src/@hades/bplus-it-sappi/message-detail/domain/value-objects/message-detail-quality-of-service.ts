import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailQualityOfService extends StringValueObject 
{
    public readonly type: 'MessageDetailQualityOfService';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailQualityOfService',
            nullable: true,
            undefinable: true,
            maxLength: 20,            
        }, validationRules));
    }
}