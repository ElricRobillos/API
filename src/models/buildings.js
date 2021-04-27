'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buildings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  buildings.init(
    {
      buildingID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      buildingName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg : "Building Name is required"},
          notEmpty: { msg : 'Building Name should not be empty'},
        },
        unique: {msg: "Building Name already existed."},
      },

      
  }, {
    sequelize,
    timestamps: true,
    createdAt: "addedAt",
    modelName: 'buildings',
  });
  return buildings;
};