import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Op } from 'sequelize';
import * as moment from 'moment-timezone';

export class SequelizeCriteria implements ICriteria
{
    implements(queryStatement?: QueryStatement, cQMetadata?: CQMetadata): QueryStatement
    {
        // add timezone to query statement
        if (cQMetadata?.timezone)
        {
            queryStatement = Utils.deepMapValues(queryStatement, (value, key) =>
            {
                const isDate = value.match(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/);
                return isDate ? moment.tz(value, cQMetadata.timezone).tz(process.env.TZ).format('YYYY-MM-DD HH:mm:ss') : value;
            });
        }

        // replace key string by sequelize symbols
        return Utils.deepMapKeys(queryStatement, key => key.startsWith('[') && key.endsWith(']') ? Op[key.slice(1,-1)] : key);
    }
}