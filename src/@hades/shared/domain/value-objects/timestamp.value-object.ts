import { StringValueObject } from './string.value-object';
import { BadRequestException } from '@nestjs/common';
import * as moment from 'moment-timezone';

export abstract class TimestampValueObject extends StringValueObject
{
    get value(): string
    {
        return super.value;
    } 

    set value(value: string)
    {
        if (value !== null && !((new Date(value)).getTime() > 0)) throw new BadRequestException(`Value for ${this.validationRules.name} has to be a timestamp value, value ${value} is a not valid timestamp`);

        if (process.env.TZ) 
        {
            super.value = moment(value).tz(process.env.TZ).format('YYYY-MM-DD H:mm:ss');
        }
        else
        {
            super.value = moment(value).format('YYYY-MM-DD H:mm:ss');
        }
    }
}