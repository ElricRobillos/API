'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authors extends Model {
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

      // From author_material table
      this.belongsToMany(models.materials, {
        through: 'author_material',
        as: 'written_materials',
        foreignKey: 'authorID',
        otherKey: 'materialID',
      })
    }
  };
  
  authors.init({
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
    // Foreign keys
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
    timestamps: true,
    createdAt: 'addedAt',
    modelName: 'authors',
  });
  return authors;
};