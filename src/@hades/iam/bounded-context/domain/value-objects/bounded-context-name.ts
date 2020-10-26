import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class BoundedContextName extends StringValueObject
{
    public readonly type: 'BoundedContextName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'BoundedContextName',
            nullable: false,
            undefinable: false,
            maxLength: 255,        }, validationRules));
    }
}