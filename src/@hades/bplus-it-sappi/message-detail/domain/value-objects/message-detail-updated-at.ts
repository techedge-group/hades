import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'MessageDetailUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}