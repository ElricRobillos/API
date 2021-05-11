'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class weedings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  weedings.init({
    weedID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    },
    description:{
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active",
      validate : {
        isIn:{
        args: [["Active","Inactive"]],
        msg: "Status should be Active or Inactive only.", 
        },
      },
    },
  }, 
  {
    sequelize,
    modelName: 'weedings',
  });
  return weedings;
};