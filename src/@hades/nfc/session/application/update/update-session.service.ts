import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    SessionId, 
    SessionIp, 
    SessionTagId, 
    SessionUid, 
    SessionCounter, 
    SessionExpiredAt, 
    SessionCreatedAt, 
    SessionUpdatedAt, 
    SessionDeletedAt
    
} from './../../domain/value-objects';
import { ISessionRepository } from './../../domain/session.repository';
import { NfcSession } from './../../domain/session.aggregate';

@Injectable()
export class UpdateSessionService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISessionRepository
    ) {}

    public async main(
        id: SessionId,
        ip?: SessionIp,
        tagId?: SessionTagId,
        uid?: SessionUid,
        counter?: SessionCounter,
        expiredAt?: SessionExpiredAt,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const session = NfcSession.register(
            id,
            ip,
            tagId,
            uid,
            counter,
            expiredAt,
            null,
            new SessionUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(session);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const sessionRegister = this.publisher.mergeObjectContext(
            session
        );
        
        sessionRegister.updated(session); // apply event to model events
        sessionRegister.commit(); // commit all events of model
    }
}