'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
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

      // buildingID FK
      this.belongsTo(models.buildings, {
        foreignKey: 'buildingID',
        as: 'building',
        onDelete: 'RESTRICT'
      })
      
      //From shelves table
      this.hasMany(models.shelves, {
        foreignKey: 'roomID',
        as: 'shelves',
        onDelete: 'RESTRICT'
      })

    }
  };
  rooms.init({

    roomID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    }, 

    roomName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : "Room Name is required"},
        notEmpty: { msg : 'Room Name should not be empty'},
      }
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

    // Foreign Keys
    buildingID: { 
      type: DataTypes.UUID,
      allowNull: false,
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
    createdAt: 'addedAt',
    modelName: 'rooms',
  });
  return rooms;
};