import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobOverviewDeletedAt extends TimestampValueObject 
{
    public readonly type: 'JobOverviewDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobOverviewDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}