'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shelves extends Model {
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
      //roomID FK
      this.belongsTo(models.rooms, {
        foreignKey: 'roomID',
        as: 'room',
        onDelete: 'RESTRICT'
      })

      // From materials table
      this.hasMany(models.materials, {
        foreignKey: 'shelfID',
        as: 'materials',
        onDelete: 'RESTRICT'
      })
    }
  };
  shelves.init(
    {
      shelfID : {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      shelfName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg : 'Shelf name should not be null'},
          notEmpty: { msg : 'Shelf name should not be empty'},
        },
        unique: {msg: "The shelf name is already existed."},
        
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
//Foreign Keys
      roomID: { 
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

    },  {
    sequelize,
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'shelves',
  });
  return shelves;
};
