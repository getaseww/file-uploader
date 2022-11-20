import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/db'

interface FileAttributes {
    id: number;
    fileName: string;
    fileSize:number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }

  export interface FileInput extends Optional<FileAttributes, 'id' | 'fileName'|'fileSize'> {}
  export interface FileOuput extends Required<FileAttributes> {}

  class File extends Model<FileAttributes, FileInput> implements FileAttributes {
    public id!: number
    public fileName!: string
    public fileSize!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  File.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileSize:{
      type:DataTypes.BIGINT,
      allowNull:false
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })
  
  export default File