import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentLibraryCreatedAt extends TimestampValueObject
{
    public readonly type: 'AttachmentLibraryCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'AttachmentLibraryCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}