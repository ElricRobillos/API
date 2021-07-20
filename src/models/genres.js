"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class genres extends Model {
    static associate(models) {

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

      // From material table
      this.belongsToMany(models.materials, {
        through: 'genre_material',
        as: 'genre_used_by_materials',
        foreignKey: 'genreID',
        otherKey: 'materialID',
      })
    }
  }

  genres.init({
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
      unique: {msg: "Genre already existed"},
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
    modelName: "genres",
  });

  return genres;
};
