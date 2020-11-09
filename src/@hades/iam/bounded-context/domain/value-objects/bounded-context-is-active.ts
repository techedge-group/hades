import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class BoundedContextIsActive extends BooleanValueObject
{
    public readonly type: 'BoundedContextIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'BoundedContextIsActive',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}