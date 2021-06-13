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

      // Added
      this.belongsTo(models.users, {
        foreignKey: 'addedBy',
        as: 'added_by_librarian',
        onDelete: 'RESTRICT'
      })

      // Updated
      this.belongsTo(models.users, {
        foreignKey: 'updatedBy',
        as: 'updated_by_librarian',
        onDelete: 'RESTRICT'
      })
      // From copies table
      this.hasOne(models.copies, {
        foreignKey: 'weedID',
        as: 'weeding_copies',
        onDelete: 'RESTRICT'
      })
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
      defaultValue: "Weeded",
    },
    addedBy: { 
      type: DataTypes.UUID,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },

  }, 
  {
    sequelize,
    modelName: 'weedings',
  });
  return weedings;
};