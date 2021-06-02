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
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Location is required"},
          notEmpty: { msg: "Location should not be empty"},
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Active",
        validate : {
          isIn:{
            args: [["Active","Inactive"]],
            msg: "Status should be Active or Inactive only." 
          },
        },
      },
      addedBy: { 
        type: DataTypes.UUID,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      
  }, {
    sequelize,
    timestamps: true,
    createdAt: "addedAt",
    modelName: 'buildings',
  });
  return buildings;
};