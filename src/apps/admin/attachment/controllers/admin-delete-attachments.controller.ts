import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AttachmentDto } from './../dto/attachment.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAttachmentsQuery } from '@hades/admin/attachment/application/get/get-attachments.query';
import { DeleteAttachmentsCommand } from '@hades/admin/attachment/application/delete/delete-attachments.command';

@ApiTags('[admin] attachment')
@Controller('admin/attachments')
@Permissions('admin.attachment.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAttachmentsController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete attachments in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AttachmentDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const attachments = await this.queryBus.ask(new GetAttachmentsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAttachmentsCommand(queryStatement, constraint, { timezone }));

        return attachments;
    }
}