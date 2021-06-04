'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materials extends Model {
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

      // shelfID FK
      this.belongsTo(models.shelves, {
        foreignKey: 'shelfID',
        as: 'materials_shelves',
        onDelete: 'RESTRICT'
      })
       // From copies table
       this.hasMany(models.copies, {
        foreignKey: 'materialID',
        as: 'materials_copies',
        onDelete: 'RESTRICT'
      })
      // From authors table
      this.hasMany(models.authors, {
        foreignKey: 'materialID',
        as: 'materials_authors',
        onDelete: 'RESTRICT'
      })
      //From genres table
      this.hasMany(models.genres, {
        foreignKey: 'materialID',
        as: 'materials_genres',
        onDelete: 'RESTRICT'
      })
      //From favorites table
      this.hasMany(models.favorites, {
        foreignKey: 'materialID',
        as: 'materials_favorites',
        onDelete: 'RESTRICT'
      })
    }
  };
  materials.init({
    materialID : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    standardType:{
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn:{
          args: [["ISSN", "ISBN"]],
          msg: "Standard Type should be ISSN or ISBN",
        },
      },
    },
    standardNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: {msg: "Standard Number already existed"},
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : 'Title should not be null'},
        notEmpty: { msg : 'Title should not be empty'},
      },
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : 'Format should not be null'},
        notEmpty: { msg : 'Format should not be empty'},
      },
    },
    pageNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg : 'Page number should not be null'},
        notEmpty: { msg : 'Page number should not be empty'},
      },
    },
    volumeNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg : 'Volume number should not be null'},
        notEmpty: { msg : 'Volume number should not be empty'},
      },
    },
    editionYear: {
      type : DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg : 'Edition year should not be null'},
        notEmpty: { msg : 'Edition year should not be empty'},
      },
    },
    seriesYear: {
      type : DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg : 'Series year should not be null'},
        notEmpty: { msg : 'Series year should not be empty'},
      },
    },
    dateOfPublication: {
      type : DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg : 'Date of publication should not be null'},
        notEmpty: { msg : 'Date of publication not be empty'},
      },
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
    shelfID: { 
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
    createdAt: 'addedAt',
    modelName: 'materials',
  });
  return materials;
};