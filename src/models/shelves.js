'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shelves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  shelves.init(
    {
      shelfId : {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      shelfName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg : 'Shelf name should not be null'},
          notEmpty: { msg : 'Shelf name should not be empty'},
        },
        unique: {msg: "The shelf name is already existed."},
        
      },

    },  {
    sequelize,
    createdAt: 'addedAt',
    modelName: 'shelves',
  });
  return shelves;
};