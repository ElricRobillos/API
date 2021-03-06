"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class publication_countries extends Model {
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

      // From materials table
      this.hasMany(models.materials, {
        foreignKey: 'pubCountryID',
        as: 'materials',
        onDelete: 'RESTRICT'
      })
    }
  }

  publication_countries.init({
    pubCountryID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Country should not be null" },
        notEmpty: { msg: "Country should not be empty" },
      },
      unique: { msg: "The Country is already existed." },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active",
      validate: {
        isIn: {
          args: [["Active", "Inactive"]],
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

  }, {
    sequelize,
    timestamps: true,
    createdAt: "addedAt",
    modelName: "publication_countries",
  });

  return publication_countries;
};
