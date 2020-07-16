import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class RoleTenantId extends UuidValueObject
{
    public readonly type: 'RoleTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RoleTenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}