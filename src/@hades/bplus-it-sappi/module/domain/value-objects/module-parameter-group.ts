import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleParameterGroup extends StringValueObject 
{
    public readonly type: 'ModuleParameterGroup';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleParameterGroup',
            nullable: true,
            undefinable: true,
            maxLength: 255,            
        }, validationRules));
    }
}