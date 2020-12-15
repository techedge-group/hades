import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AttachmentLibraryDto } from './../dto/attachment-library.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAttachmentLibrariesQuery } from '@hades/admin/attachment-library/application/get/get-attachment-libraries.query';
import { DeleteAttachmentLibrariesCommand } from '@hades/admin/attachment-library/application/delete/delete-attachment-libraries.command';

@ApiTags('[admin] attachment-library')
@Controller('admin/attachment-libraries')
@Permissions('admin.attachmentLibrary.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAttachmentLibrariesController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete attachment-libraries in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AttachmentLibraryDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const attachmentLibraries = await this.queryBus.ask(new GetAttachmentLibrariesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAttachmentLibrariesCommand(queryStatement, constraint, { timezone }));

        return attachmentLibraries;
    }
}