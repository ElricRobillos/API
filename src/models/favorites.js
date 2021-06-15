'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorites extends Model {
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
        as: 'added_by_students',
        onDelete: 'RESTRICT'
      })

      this.belongsTo(models.users, {
        foreignKey: 'addedBy',
        as: 'added_by_staffs',
        onDelete: 'RESTRICT'
      })

      // Updated
      this.belongsTo(models.users, {
        foreignKey: 'updatedBy',
        as: 'updated_by_students',
        onDelete: 'RESTRICT'
      })

      this.belongsTo(models.users, {
        foreignKey: 'updatedBy',
        as: 'updated_by_staffs',
        onDelete: 'RESTRICT'
      })
      
      //materialID FK
      this.belongsTo(models.materials, {
        foreignKey: 'materialID',
        as: 'material',
        onDelete: 'RESTRICT'
      })

    }
  };
  favorites.init({
    favoriteID : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    materialID: { 
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
    modelName: 'favorites',
  });
  return favorites;
};
