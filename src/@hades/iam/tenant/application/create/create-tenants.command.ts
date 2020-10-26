export class CreateTenantsCommand
{
    constructor(
        public readonly tenants: {
            id: string,
            name: string,
            code: string,
            logo?: string,
            isActive: boolean,
            data?: any,
            accountIds?: string[],
            
        } []
    ) {}
}