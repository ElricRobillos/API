'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
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
      // userID FK
      this.belongsTo(models.users, {
        foreignKey: 'userID',
        as: 'student',
        onDelete: 'RESTRICT'
      })

      this.belongsTo(models.users, {
        foreignKey: 'userID',
        as: 'staff',
        onDelete: 'RESTRICT'
      })

      // From material borrow records table
      this.hasMany(models.materials_borrow_records, {
        foreignKey: 'transactionID',
        as: 'material_borrow_records',
        onDelete: 'RESTRICT'
      })
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