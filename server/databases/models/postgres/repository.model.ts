import { DataTypes } from "sequelize";
import connection from "../../../config/sequelize";
import { RepositoryStatic } from '../../../types/databases/models/postgres/repository'

const RepositoryModel: RepositoryStatic = connection.define("repositories", {
  id: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  stars: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  creator_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
},
);

export default RepositoryModel;
