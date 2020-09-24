import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserDeletedAt extends TimestampValueObject 
{
    public readonly type: 'UserDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'UserDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}