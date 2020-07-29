import { Column, Model, Table, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';
import { BplusItSappiExecutionModel } from '@hades/bplus-it-sappi/execution/infrastructure/sequelize/sequelize-execution.model';
import { BplusItSappiChannelModel } from '@hades/bplus-it-sappi/channel/infrastructure/sequelize/sequelize-channel.model';

@Table({ modelName: 'bplus_it_sappi_channel_detail', freezeTableName: true })
export class BplusItSappiChannelDetailModel extends Model<BplusItSappiChannelDetailModel> 
{ 
        
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
    })
    id: string;
        
             
        
    
    @Column({
        field: 'tenant_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {
            model: AdminTenantModel,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    tenantId: string;
        
    
    @BelongsTo(() => AdminTenantModel)
    tenant: AdminTenantModel;
             
        
    
    @Column({
        field: 'tenant_code',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(50),
        
    })
    tenantCode: string;
        
             
        
    
    @Column({
        field: 'system_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {
            model: BplusItSappiSystemModel,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    systemId: string;
        
    
    @BelongsTo(() => BplusItSappiSystemModel)
    system: BplusItSappiSystemModel;
             
        
    
    @Column({
        field: 'system_name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(20),
        
    })
    systemName: string;
        
             
        
    
    @Column({
        field: 'execution_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {
            model: BplusItSappiExecutionModel,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    executionId: string;
        
    
    @BelongsTo(() => BplusItSappiExecutionModel)
    execution: BplusItSappiExecutionModel;
             
        
    
    @Column({
        field: 'execution_type',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.ENUM('SUMMARY','DETAIL'),
        
    })
    executionType: string;
        
             
        
    
    @Column({
        field: 'execution_executed_at',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.DATE,
        
    })
    executionExecutedAt: string;
        
             
        
    
    @Column({
        field: 'execution_monitoring_start_at',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.DATE,
        
    })
    executionMonitoringStartAt: string;
        
             
        
    
    @Column({
        field: 'execution_monitoring_end_at',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.DATE,
        
    })
    executionMonitoringEndAt: string;
        
             
        
    
    @Column({
        field: 'status',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.ENUM('ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED'),
        
    })
    status: string;
        
             
        
    
    @Column({
        field: 'channel_hash',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.CHAR(40),
        
        references: {
            model: BplusItSappiChannelModel,
            key: 'hash'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    channelHash: string;
        
    
    @BelongsTo(() => BplusItSappiChannelModel)
    channelHash: BplusItSappiChannelModel;
             
        
    
    @Column({
        field: 'channel_sap_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(50),
        
    })
    channelSapId: string;
        
             
        
    
    @Column({
        field: 'channel_party',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(160),
        
    })
    channelParty: string;
        
             
        
    
    @Column({
        field: 'channel_component',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    channelComponent: string;
        
             
        
    
    @Column({
        field: 'channel_name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(160),
        
    })
    channelName: string;
        
             
        
    
    @Column({
        field: 'detail',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.TEXT,
        
    })
    detail: string;
        
             
        
    
    @Column({
        field: 'created_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
        
    })
    createdAt: string;
        
             
        
    
    @Column({
        field: 'updated_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
        
    })
    updatedAt: string;
        
             
        
    
    @Column({
        field: 'deleted_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
        
    })
    deletedAt: string;
        
            
}