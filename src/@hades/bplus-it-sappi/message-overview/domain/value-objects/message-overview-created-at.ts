import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewCreatedAt extends TimestampValueObject 
{
    public readonly type: 'MessageOverviewCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}