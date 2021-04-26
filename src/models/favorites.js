'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  favorites.init({
    favoriteId : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    dateAdded: {
      type: DataTypes.DATE,
      allowNull: false,
      
    },

  }, {
    sequelize,
    createdAt: 'addedAt',
    modelName: 'favorites',
  });
  return favorites;
};