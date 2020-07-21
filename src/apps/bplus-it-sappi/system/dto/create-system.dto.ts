import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '155d7aea-3a8b-4094-9b3d-2dee69f8ff57'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'a75c37c6-fd48-4632-9624-dcf977c42fe4'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'k'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantCode [input here api field description]',
            example     : 'p'
        })
        tenantCode: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'environment [input here api field description]',
            example     : 'r'
        })
        environment: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'version [input here api field description]',
            example     : 'c'
        })
        version: string;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : false
        })
        isActive: boolean;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'cancelledAt [input here api field description]',
            example     : '2020-07-21 20:59:38'
        })
        cancelledAt: string;
    
    
}
