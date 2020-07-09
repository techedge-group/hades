export class InsertSessionsCommand 
{
    constructor(
        public readonly sessions: {
            id: string,
            ip: string,
            tagId: string,
            uid: string,
            counter: number,
            expiredAt?: string,
            
        } []
    ) {}
}