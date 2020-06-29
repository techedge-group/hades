import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobExecutionExecutedAt extends TimestampValueObject 
{
    public readonly type: 'JobExecutionExecutedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobExecutionExecutedAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}