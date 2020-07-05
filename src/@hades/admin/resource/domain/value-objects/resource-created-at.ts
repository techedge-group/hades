import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ResourceCreatedAt extends TimestampValueObject 
{
    public readonly type: 'ResourceCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ResourceCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}