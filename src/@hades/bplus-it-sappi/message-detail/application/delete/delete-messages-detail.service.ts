import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';

@Injectable()
export class DeleteMessagesDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const messagesDetail = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);        

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const messagesDetailRegistered = this.publisher.mergeObjectContext(messagesDetail);
        
        // messagesDetailRegistered.deleted(messagesDetail); // apply event to model events
        // messagesDetailRegistered.commit(); // commit all events of model
    }
}