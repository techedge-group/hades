import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RoleTenantCode extends StringValueObject 
{
    public readonly type: 'RoleTenantCode';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RoleTenantCode',
            nullable: false,
            undefinable: false,
            maxLength: 50,            
        }, validationRules));
    }
}