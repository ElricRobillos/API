'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class material_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  material_types.init(
    {
      typeId : {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      typeName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg : 'Type of materials should not be null'},
          notEmpty: { msg : 'Type of materials should not be empty'},
        },
        unique: {msg: "The material type is already existed."},
        
      },

    }, 
    {
      sequelize,
      timestamps: true,
      createdAt: 'addedAt',
      modelName: 'material_types',
    }
  );
  return material_types;
};