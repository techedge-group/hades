import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilyResourceIds extends UuidArrayValueObject
{
    public readonly type: 'AttachmentFamilyResourceIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilyResourceIds',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}