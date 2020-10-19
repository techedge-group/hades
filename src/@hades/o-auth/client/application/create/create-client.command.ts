export class CreateClientCommand 
{   
    constructor(
        public readonly id: string,
        public readonly grantType: string,
        public readonly name: string,
        public readonly secret: string,
        public readonly authUrl: string,
        public readonly redirect: string,
        public readonly expiredAccessToken: number,
        public readonly expiredRefreshToken: number,
        public readonly isActive: boolean,
        public readonly isMaster: boolean,
        public readonly applicationIds: string[],
        
    ) {}
}