'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Added
      this.belongsTo(models.users, {
        foreignKey: 'addedBy',
        as: 'added_by_librarian',
        onDelete: 'RESTRICT'
      })

      // Updated
      this.belongsTo(models.users, {
        foreignKey: 'updatedBy',
        as: 'updated_by_librarian',
        onDelete: 'RESTRICT'
      })
      // authorDetailsID FK
      this.belongsTo(models.authorDetails, {
        foreignKey: 'authorDetailsID',
        as: 'authors_authorDetails',
        onDelete: 'RESTRICT'
      })
    }
  };
  authors.init({
    authorID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    // Foreign keys
    authorDetailsID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    materialID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    addedBy: { 
      type: DataTypes.UUID,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },

  }, 
  
  
  
  
  {
    sequelize,
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'authors',
  });
  return authors;
};