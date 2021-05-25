'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(users, {
        as: "added",
        foreignKey: "added_by",
      });

      this.belongsTo(users, {
        as: "updated",
        foreignKey: "updated_by",
      });
    }
  };
  users.init(
    {
    userID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    idNumber: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg : "ID Number is required"},
          notEmpty: { msg : 'ID Number should not be empty'},
        },
        unique: {msg: "ID Number already exists."},
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Enter a valid email address." },
      },
      unique: { msg: "Email already exists." },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : "Password is required"},
        notEmpty: { msg : 'Password should not be empty'},
      },
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : "First name is required"},
        notEmpty: { msg : 'First name should not be empty'},
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg : "Last name is required"},
        notEmpty: { msg : 'Last name should not be empty'},
      },
    },

    middleName: {
      type: DataTypes.STRING,
    },

    fullName: {
      type: DataTypes.STRING,
      set(value){
        this.setDataValue(
          "fullName",
          this.firstName + " " + this.middleName + " " + this.lastName
          );
      }
    },

    contactNumber: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg : "Contact Number is required"},
          notEmpty: { msg : 'Contact Number should not be empty'},
        },
        unique: {msg: "Contact Number already exists."},
    },

    course: {
      type: DataTypes.STRING
    },

    section: {
      type: DataTypes.STRING,
    },

    userType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Librarian", "Staff", "Student"]],
          msg: "User type should be Librarian, Staff or Student only.",
        },
      },
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Active",
      validate : {
        isIn:{
          args: [["Active","Inactive"]],
        msg: "Status should be Active or Inactive only." 
        },
      },
    },
    added_by: { 
        type: DataTypes.UUID,
        references: {
          model: users,
          key: "userID",
        },
      },
    updated_by: {
      type: DataTypes.UUID,
      references: {
        model: users,
        key: "userID",
      },
    },

  }, {
    sequelize,
    timestamps: true,
    createdAt: "addedAt", 
    modelName: 'users',
  });
  return users;
};