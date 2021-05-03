'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  materials.init({
    materialId : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    standardType:{
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn:{
          args: [["ISSN", "ISBN"]],
          msg: "Gender should be Male or Female.",
        },
      },
    },
    standardNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: {msg: "Standard Number already existed"},
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : 'Title should not be null'},
        notEmpty: { msg : 'Title should not be empty'},
      },
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : 'Format should not be null'},
        notEmpty: { msg : 'Format should not be empty'},
      },
    },
    pageNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg : 'Page number should not be null'},
        notEmpty: { msg : 'Page number should not be empty'},
      },
    },
    volumeNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg : 'Volume number should not be null'},
        notEmpty: { msg : 'Volume number should not be empty'},
      },
    },
    editionYear: {
      type : DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg : 'Edition year should not be null'},
        notEmpty: { msg : 'Edition year should not be empty'},
      },
    },
    seriesYear: {
      type : DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg : 'Series year should not be null'},
        notEmpty: { msg : 'Series year should not be empty'},
      },
    },
    dateOfPublication: {
      type : DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg : 'Date of publication should not be null'},
        notEmpty: { msg : 'Date of publication not be empty'},
      },
    },
    image: {
      type : DataTypes.STRING,
      allowNull: false,
    },

  }, 
  {
    sequelize,
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'materials',
  });
  return materials;
};