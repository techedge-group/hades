import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailNode extends IntValueObject 
{
    public readonly type: 'MessageDetailNode';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailNode',
            nullable: true,
            undefinable: true,
            maxLength: 10,
            unsigned: true,
        }, validationRules));
    }
}