'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorites extends Model {
    static associate(models) {

      this.belongsTo(models.users, {
        foreignKey: 'borrowerID',
        as: 'favorite_by',
        onDelete: 'RESTRICT'
      })

      this.belongsTo(models.materials, {
        foreignKey: 'materialID',
        as: 'favorite_material',
        onDelete: 'RESTRICT'
      })

    }
  };

  favorites.init({
    favoriteID : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    // Foreign Keys
    borrowerID: { 
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'userID'
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
    },

  }, {
    sequelize,
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'favorites',
  });
  return favorites;
};
