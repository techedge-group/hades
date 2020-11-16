import { ApiProperty } from '@nestjs/swagger';
import { AttachmentFamilyDto } from './../../../admin/attachment-family/dto/attachment-family.dto';

export class ResourceDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
    })
    boundedContextId: string;

    @ApiProperty({
        type        : [AttachmentFamilyDto],
        description : 'attachmentFamilyIds [input here api field description]',
    })
    attachmentFamilies: AttachmentFamilyDto[];

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
    })
    hasCustomFields: boolean;

    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
    })
    hasAttachments: boolean;

    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
    })
    createdAt: string;

    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
    })
    updatedAt: string;

    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
    })
    deletedAt: string;

}