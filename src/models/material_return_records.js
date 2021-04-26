'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class material_return_records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  material_return_records.init({
    returnId : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      
    },

  }, {
    sequelize,
    createdAt: 'addedAt',
    modelName: 'material_return_records',
  });
  return material_return_records;
};