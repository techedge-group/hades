import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export interface CQMetadata
{
    timezone?: string,
}

export interface DataValueObject
{
    haveToEncrypt?: boolean,
    currentTimestamp?: boolean,
    addTimezone?: string,
    removeTimezone?: string,
}

export interface HookResponse
{
    queryStatement?: QueryStatement,
    cQMetadata?: CQMetadata
}

export interface Jwt
{
    jit: string;            // id from this token
    aci: string;            // account id
    iss: string;            // name to identify who belong this token
    iat: number;            // timestamp when this token was issued
    nbf: number;            // token accepted not before this timestamp
    exp: number|null;       // timestamp when expired this token
}

export interface MapperOptions
{
    eagerLoading: boolean;
}

export interface ObjectLiteral
{
    [key: string]: any;
}

export interface SeederBoundedContext
{
    id: string,
    name: string,
    root: string,
    sort: number,
    isActive: boolean,
}

export interface SeederPermission
{
    id: string,
    name: string,
    boundedContextId: string,
    roleIds?: string[],
}

export interface ValidationRules
{
    name?: string,
    nullable?: boolean;
    undefinable?: boolean;
    length?:number;
    minLength?: number;
    maxLength?: number;
    enumOptions?: string[];
    decimalOptions?: number[];
    unsigned?: boolean;
    default?: any;
}