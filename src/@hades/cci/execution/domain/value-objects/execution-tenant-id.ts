import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ExecutionTenantId extends UuidValueObject
{
    public readonly type: 'ExecutionTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ExecutionTenantId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}