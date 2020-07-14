import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ActionUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'ActionUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ActionUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}