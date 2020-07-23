import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';
import { BplusItSappiExecutionModel } from '@hades/bplus-it-sappi/execution/infrastructure/sequelize/sequelize-execution.model';

@Table({ modelName: 'bplus_it_sappi_channel_overview', freezeTableName: true })
export class BplusItSappiChannelOverviewModel extends Model<BplusItSappiChannelOverviewModel> 
{ 
        
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;
        
             
        
    @ForeignKey(() => AdminTenantModel)
    
    @Column({
        field: 'tenant_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
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
        
             
        
    @ForeignKey(() => BplusItSappiSystemModel)
    
    @Column({
        field: 'system_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
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
        
             
        
    @ForeignKey(() => BplusItSappiExecutionModel)
    
    @Column({
        field: 'execution_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
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
        field: 'error',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    error: number;
        
             
        
    @Column({
        field: 'inactive',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    inactive: number;
        
             
        
    @Column({
        field: 'successful',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    successful: number;
        
             
        
    @Column({
        field: 'stopped',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    stopped: number;
        
             
        
    @Column({
        field: 'unknown',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    unknown: number;
        
             
        
    @Column({
        field: 'unregistered',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    unregistered: number;
        
             
        
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