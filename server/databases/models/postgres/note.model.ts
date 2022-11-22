import { DataTypes } from "sequelize";
import connection from "../../../config/sequelize";

const NoteModel = connection.define("notes", {
  id: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  repository_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  text: {
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
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
});

// NoteModel.sync({ force: true })

export default NoteModel;
