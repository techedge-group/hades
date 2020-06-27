import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TenantUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'TenantUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}