'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class materials_borrow_records extends Model {
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

      //Return Process by
      this.belongsTo(models.users, {
        foreignKey: 'return_processBy',
        as: 'librarian',
        onDelete: 'RESTRICT'
      })

      this.belongsTo(models.users, {
        foreignKey: 'return_processBy',
        as: 'staff',
        onDelete: 'RESTRICT'
      })

      this.belongsTo(models.users, {
        foreignKey: 'return_processBy',
        as: 'student',
        onDelete: 'RESTRICT'
      })
      
      this.belongsTo(models.copies, {
        foreignKey: 'copyID',
        as: 'copy',
        onDelete: 'RESTRICT'
      })

      this.belongsTo(models.transactions, {
        foreignKey: 'transactionID',
        as: 'transaction',
        onDelete: 'RESTRICT'
      })

    }
  };

  materials_borrow_records.init({
    borrowID : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }, 

    dueDate : {
      type : DataTypes.DATE,
      allowNull : false
    },

    returnDate: {
      type : DataTypes.DATE
    },

    returnProcessBy : {
      type: DataTypes.STRING
    },

    proofOfReturn : {
      type : DataTypes.STRING
    },

    status :{
      type: DataTypes.STRING,
      validate : {
        isIn:[["Unreturned", "Returned", "Overdue"]] 
      },
      defaultValue: "Unreturned"
    },

    //FK's
    copyID:{
      type: DataTypes.UUID,
      allowNull: false,
    },

    transactionID:{
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
    modelName: 'materials_borrow_records',
  });
  return materials_borrow_records;
};