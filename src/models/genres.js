"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class genres extends Model {
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
      
      //materialID FK
      this.belongsTo(models.materials, {
        foreignKey: 'materialID',
        as: 'material',
        onDelete: 'RESTRICT'
      })
    }
  }
  genres.init(
    {
      genreID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Genre should not be null" },
          notEmpty: { msg: "Genre should not be empty" },
        },
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
      //Foreign keys
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

    },
    {
      sequelize,
      timestamps: true,
      createdAt: "addedAt",
      modelName: "genres",
    }
  );

  return genres;
};
