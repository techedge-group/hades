import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ApplicationUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'ApplicationUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ApplicationUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}