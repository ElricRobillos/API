'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  authors.init({
    
  }, 
  
  
  
  
  {
    sequelize,
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'authors',
  });
  return authors;
};