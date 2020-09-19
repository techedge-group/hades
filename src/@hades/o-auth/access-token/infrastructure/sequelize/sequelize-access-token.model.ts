import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthClientModel } from '@hades/o-auth/client/infrastructure/sequelize/sequelize-client.model';

@Table({ modelName: 'o_auth_access_token', freezeTableName: true })
export class OAuthAccessTokenModel extends Model<OAuthAccessTokenModel> 
{ 
        
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
        
    })
    id: string;
        
             
        
    @ForeignKey(() => OAuthClientModel)
    
    
    @Column({
        field: 'client_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        
        references: {  
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    clientId: string;
        
    
    @BelongsTo(() => OAuthClientModel)
    client: OAuthClientModel;
             
        
    
    
    @Column({
        field: 'token',
        
        allowNull: false,
        type: DataTypes.TEXT,
        
        
    })
    token: string;
        
             
        
    
    
    @Column({
        field: 'name',
        
        allowNull: true,
        type: DataTypes.STRING(255),
        
        
    })
    name: string;
        
             
        
    
    
    @Column({
        field: 'is_revoked',
        
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
        
    })
    isRevoked: boolean;
        
             
        
    
    
    @Column({
        field: 'expires_at',
        
        allowNull: true,
        type: DataTypes.DATE,
        
        
    })
    expiresAt: string;
        
             
        
    
    
    @Column({
        field: 'created_at',
        
        allowNull: true,
        type: DataTypes.DATE,
        
        
    })
    createdAt: string;
        
             
        
    
    
    @Column({
        field: 'updated_at',
        
        allowNull: true,
        type: DataTypes.DATE,
        
        
    })
    updatedAt: string;
        
             
        
    
    
    @Column({
        field: 'deleted_at',
        
        allowNull: true,
        type: DataTypes.DATE,
        
        
    })
    deletedAt: string;
        
            
}