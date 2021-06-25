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
        as: 'shelf',
        onDelete: 'RESTRICT'
      })
      // languageID FK
      this.belongsTo(models.languages, {
        foreignKey: 'languageID',
        as: 'language',
        onDelete: 'RESTRICT'
      })
      // typeID FK
      this.belongsTo(models.material_types, {
        foreignKey: 'typeID',
        as: 'material_type',
        onDelete: 'RESTRICT'
      })
      // publisherID FK
      this.belongsTo(models.publishers, {
        foreignKey: 'publisherID',
        as: 'publisher',
        onDelete: 'RESTRICT'
      })
      // pubCountryID FK
      this.belongsTo(models.publication_countries, {
        foreignKey: 'pubCountryID',
        as: 'publication_country',
        onDelete: 'RESTRICT'
      })
       // From copies table
      this.hasMany(models.copies, {
        foreignKey: 'materialID',
        as: 'copies',
        onDelete: 'RESTRICT'
      })

      // From author_material table
      this.hasMany(models.author_material, {
        foreignKey: 'materialID',
        as: 'author_materials',
        onDelete: 'RESTRICT'
      })

      // From genre_material table
      this.hasMany(models.genre_material, {
        foreignKey: 'materialID',
        as: 'genre_materials',
        onDelete: 'RESTRICT'
      })

      //From favorites table
      this.hasMany(models.favorites, {
        foreignKey: 'materialID',
        as: 'favorites',
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
      type: DataTypes.STRING,
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
    },
    edition: {
      type : DataTypes.STRING,
    },
    editionYear: {
      type : DataTypes.DATEONLY,
    },
    seriesYear: {
      type : DataTypes.DATEONLY,
    },
    dateOfPublication: {
      type : DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg : 'Date of publication should not be null'},
        notEmpty: { msg : 'Date of publication not be empty'},
      },
    },
    image: {
      type : DataTypes.STRING
    },
    description: {
      type : DataTypes.STRING,
      allowNull: false
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
    // Foreign Keys
    shelfID: { 
      type: DataTypes.UUID,
      allowNull: false,
    },
    languageID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    typeID: { 
      type: DataTypes.UUID,
      allowNull: false,
    },
    publisherID: { 
      type: DataTypes.UUID,
      allowNull: false,
    },
    pubCountryID: { 
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