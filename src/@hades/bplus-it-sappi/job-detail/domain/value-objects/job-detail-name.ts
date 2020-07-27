import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDetailName extends StringValueObject 
{
    public readonly type: 'JobDetailName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailName',
            nullable: true,
            undefinable: true,
            maxLength: 255,            
        }, validationRules));
    }
}