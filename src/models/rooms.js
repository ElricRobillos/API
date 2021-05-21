'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rooms.init(
    {
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
      },
      unique: {msg: "The Room Name is already existed."},
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
  }, {
    sequelize,
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'rooms',
  });
  return rooms;
};