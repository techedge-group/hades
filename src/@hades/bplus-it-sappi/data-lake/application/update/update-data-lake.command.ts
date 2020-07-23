export class UpdateDataLakeCommand 
{
    constructor(
        public readonly id: string,
        public readonly tenantId?: string,
        public readonly tenantCode?: string,
        public readonly data?: any,
        
    ) {}
}