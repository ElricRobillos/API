'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class author_material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // authorID FK
      this.belongsTo(models.authors, {
        foreignKey: 'authorID',
        as: 'author_details',
        onDelete: 'RESTRICT'
      })

      // materialID FK
      this.belongsTo(models.materials, {
        foreignKey: 'materialID',
        as: 'material_details',
        onDelete: 'RESTRICT'
      })
    }
  };
  author_material.init({
    authorMaterialID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    // Foreign keys
    authorID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: {
          tableName: 'authors'
        },
        key: 'authorID'
      },
    },
    materialID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: {
          tableName: 'materials'
        },
        key: 'materialID'
      },
    }

  }, 
  
  {
    sequelize,
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'author_material',
  });
  return author_material;
};