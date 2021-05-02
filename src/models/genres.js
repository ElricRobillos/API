'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  genres.init(
    {
      genreID : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      },
  
      genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : 'Genre should not be null'},
        notEmpty: { msg : 'Genre should not be empty'},
      },
      }, 
  },
  {
    sequelize,
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'genres',
  });
  
    return genres;
};

