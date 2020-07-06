export class UpdateResourceCommand 
{
    constructor(
        public readonly id: string,
        public readonly boundedContextId?: string,
        public readonly name?: string,
        public readonly hasCustomFields?: boolean,
        public readonly hasAttachments?: boolean,
        
    ) {}
}