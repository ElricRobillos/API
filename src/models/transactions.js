'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
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
      });

      this.belongsTo(models.users, {
        foreignKey: 'userID',
        as: 'transaction_borrower',
        onDelete: 'RESTRICT'
      });

      // From material borrow records table
      this.hasMany(models.materials_borrow_records, {
        foreignKey: 'transactionID',
        as: 'material_borrow_records',
        onDelete: 'RESTRICT'
      });
    }
  };
  
  transactions.init({
    transactionID : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    borrowDate: {
      type : DataTypes.DATE
    },
    
    // Foreign Keys
    userID: { 
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
    modelName: 'transactions',
  });
  return transactions;
};