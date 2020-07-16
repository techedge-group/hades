import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JobDetailDto } from './../dto/job-detail.dto';
import { CreateJobDetailDto } from './../dto/create-job-detail.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertJobsDetailCommand } from '@hades/bplus-it-sappi/job-detail/application/insert/insert-jobs-detail.command';

@ApiTags('[bplus-it-sappi] job-detail')
@Controller('bplus-it-sappi/jobs-detail')
export class InsertJobsDetailController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert jobs-detail in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [JobDetailDto] })
    @ApiBody({ type: [CreateJobDetailDto] })
    async main(@Body() payload: CreateJobDetailDto[])
    {
        await this.commandBus.dispatch(new InsertJobsDetailCommand(payload));
    }
}