import { ApiProperty } from '@nestjs/swagger';

export class UpdateExecutionDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'ee59f251-931b-4ed9-bc5d-bfdc6041a958'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '99499fd1-c68b-4675-9ae7-4371fef2399a'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'type [input here api field description]',
            example     : 'SUMMARY',
            enum        : ['SUMMARY','DETAIL']
        })
        type: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'monitoringStartAt [input here api field description]',
            example     : '2020-07-21 05:17:14'
        })
        monitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'monitoringEndAt [input here api field description]',
            example     : '2020-07-21 01:23:36'
        })
        monitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executedAt [input here api field description]',
            example     : '2020-07-21 10:47:54'
        })
        executedAt: string;
    
    
}
