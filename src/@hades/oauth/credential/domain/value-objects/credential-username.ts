import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class CredentialUsername extends StringValueObject 
{
    public readonly type: 'CredentialUsername';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'CredentialUsername',
            nullable: false,
            undefinable: false,
                        
        }, validationRules));
    }
}