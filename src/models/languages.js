"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class languages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  languages.init(
    {
      languageID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      language: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Language should not be null" },
          notEmpty: { msg: "Language should not be empty" },
        },
        unique: { msg: "The language is already existed." },
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
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "addedAt",
      modelName: "languages",
    }
  );
  return languages;
};
