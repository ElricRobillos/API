'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genre_material extends Model {
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

      // genreID FK
      this.belongsTo(models.genres, {
        foreignKey: 'genreID',
        as: 'genres',
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
  genre_material.init({
    genreMaterialID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    // Foreign keys
    genreID: {
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
    modelName: 'genre_material',
  });
  return genre_material;
};