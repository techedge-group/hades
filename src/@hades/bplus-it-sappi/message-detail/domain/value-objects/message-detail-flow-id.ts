import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailFlowId extends UuidValueObject
{
    public readonly type: 'MessageDetailFlowId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailFlowId',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}