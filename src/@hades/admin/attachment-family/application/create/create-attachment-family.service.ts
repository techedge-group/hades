import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    AttachmentFamilyId,
    AttachmentFamilyName,
    AttachmentFamilyWidth,
    AttachmentFamilyHeight,
    AttachmentFamilyFit,
    AttachmentFamilySizes,
    AttachmentFamilyQuality,
    AttachmentFamilyFormat,
    AttachmentFamilyCreatedAt,
    AttachmentFamilyUpdatedAt,
    AttachmentFamilyDeletedAt,
} from './../../domain/value-objects';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { AdminAttachmentFamily } from './../../domain/attachment-family.aggregate';

@Injectable()
export class CreateAttachmentFamilyService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentFamilyRepository,
    ) {}

    public async main(
        payload: {
            id: AttachmentFamilyId,
            name: AttachmentFamilyName,
            width: AttachmentFamilyWidth,
            height: AttachmentFamilyHeight,
            fit: AttachmentFamilyFit,
            sizes: AttachmentFamilySizes,
            quality: AttachmentFamilyQuality,
            format: AttachmentFamilyFormat,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const attachmentFamily = AdminAttachmentFamily.register(
            payload.id,
            payload.name,
            payload.width,
            payload.height,
            payload.fit,
            payload.sizes,
            payload.quality,
            payload.format,
            new AttachmentFamilyCreatedAt({currentTimestamp: true}),
            new AttachmentFamilyUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(attachmentFamily);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentFamilyRegister = this.publisher.mergeObjectContext(
            attachmentFamily
        );

        attachmentFamilyRegister.created(attachmentFamily); // apply event to model events
        attachmentFamilyRegister.commit(); // commit all events of model
    }
}