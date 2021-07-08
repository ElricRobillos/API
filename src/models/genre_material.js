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
      references: {
        model: {
          tableName: 'genres'
        },
        key: 'genreID'
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
    modelName: 'genre_material',
  });
  return genre_material;
};