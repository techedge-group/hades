import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FlowResponse } from './../../domain/flow.response';
import { FlowMapper } from './../../domain/flow.mapper';
import { FindFlowQuery } from './find-flow.query';
import { FindFlowService } from './find-flow.service';

@QueryHandler(FindFlowQuery)
export class FindFlowQueryHandler implements IQueryHandler<FindFlowQuery>
{
    private readonly mapper: FlowMapper = new FlowMapper();

    constructor(
        private readonly findFlowService: FindFlowService,
    ) {}

    async execute(query: FindFlowQuery): Promise<FlowResponse>
    {
        const flow = await this.findFlowService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(flow);
    }
}