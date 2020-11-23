import { CountryResponse } from '@hades/admin/country/domain/country.response';

export class AdministrativeAreaLevel1Response
{
    constructor(
        public readonly id: string,
        public readonly countryId: string,
        public readonly code: string,
        public readonly customCode: string,
        public readonly name: string,
        public readonly slug: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly country: CountryResponse,
    ) {}
}