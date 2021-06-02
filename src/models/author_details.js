'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class author_details extends Model {
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
    }
  };
  author_details.init({
    authorID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    authorFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : 'Author first name should not be null'},
        notEmpty: { msg : 'Author first name should not be empty'},
      },
    },
    authorLastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : 'Author last name should not be null'},
        notEmpty: { msg : 'Author last name should not be empty'},
      },
    },
    authorMiddleName: {
      type: DataTypes.STRING,
      allowNull: true,
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
    addedBy: { 
      type: DataTypes.UUID,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  }
  
  
  
  ,{
    sequelize,
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'author_details',
  });
  return author_details;
};