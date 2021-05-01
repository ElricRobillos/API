'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class copies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  copies.init({
    copyID : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    status :{
      type: DataTypes.STRING,
      validate : {
        isIn:[["Active", "Inactive", "Weeding"]] 
      },
    },
    copyNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg : 'copy number should not be null'},
        notEmpty: { msg : 'copy number should not be empty'},
      },
      unique: {msg: "notNull - Copy Number is required.."},
    }
  }, 
  {
    sequelize,
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'copies',
  });

  return copies;
};