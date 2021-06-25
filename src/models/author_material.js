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

      // authorID FK
      this.belongsTo(models.authors, {
        foreignKey: 'authorID',
        as: 'authors',
        onDelete: 'RESTRICT'
      })

      // materialID FK
      this.belongsTo(models.materials, {
        foreignKey: 'materialID',
        as: 'materials',
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
    modelName: 'author_material',
  });
  return author_material;
};