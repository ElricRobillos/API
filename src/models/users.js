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

      // ADD SECTION

      this.belongsTo(models.users, {
        foreignKey: 'addedBy',
        as: 'added_by_librarian',
        onDelete: 'RESTRICT'
      })

      this.hasMany(models.users, {
        foreignKey: 'addedBy',
        as: 'added_students',
        onDelete: 'RESTRICT'
      })

      this.hasMany(models.users, {
        foreignKey: 'addedBy',
        as: 'added_staffs',
        onDelete: 'RESTRICT'
      })

      // Added Author_details
      this.hasMany(models.author_details, {
        foreignKey: 'addedBy',
        as: 'added_author_details',
        onDelete: 'RESTRICT'
      })

      // Added Authors
      this.hasMany(models.authors, {
        foreignKey: 'addedBy',
        as: 'added_authors',
        onDelete: 'RESTRICT'
      })

      // Added Buildings
      this.hasMany(models.buildings, {
        foreignKey: 'addedBy',
        as: 'added_buildings',
        onDelete: 'RESTRICT'
      })

      // Added Copies
      this.hasMany(models.copies, {
        foreignKey: 'addedBy',
        as: 'added_copies',
        onDelete: 'RESTRICT'
      })

      // Added Favorites
      this.hasMany(models.favorites, {
        foreignKey: 'addedBy',
        as: 'added_favorites',
        onDelete: 'RESTRICT'
      })

      // Added Genres
      this.hasMany(models.genres, {
        foreignKey: 'addedBy',
        as: 'added_genres',
        onDelete: 'RESTRICT'
      })

      // Added Languages
      this.hasMany(models.languages, {
        foreignKey: 'addedBy',
        as: 'added_languages',
        onDelete: 'RESTRICT'
      })

      // Added Material Types
      this.hasMany(models.material_types, {
        foreignKey: 'addedBy',
        as: 'added_material_types',
        onDelete: 'RESTRICT'
      })

      // Added Materials
      this.hasMany(models.materials, {
        foreignKey: 'addedBy',
        as: 'added_materials',
        onDelete: 'RESTRICT'
      })

      // Added Publication Countries
      this.hasMany(models.publication_countries, {
        foreignKey: 'addedBy',
        as: 'added_publication_countries',
        onDelete: 'RESTRICT'
      })

      // Added Publishers
      this.hasMany(models.publishers, {
        foreignKey: 'addedBy',
        as: 'added_publishers',
        onDelete: 'RESTRICT'
      })

      // Added Rooms
      this.hasMany(models.rooms, {
        foreignKey: 'addedBy',
        as: 'added_rooms',
        onDelete: 'RESTRICT'
      })

      // Added Shelves
      this.hasMany(models.shelves, {
        foreignKey: 'addedBy',
        as: 'added_shelves',
        onDelete: 'RESTRICT'
      })

      // Added Transactions
      this.hasMany(models.transactions, {
        foreignKey: 'addedBy',
        as: 'added_transactions',
        onDelete: 'RESTRICT'
      })

      // Added Weedings
      this.hasMany(models.weedings, {
        foreignKey: 'addedBy',
        as: 'added_weedings',
        onDelete: 'RESTRICT'
      })

      // Added Materials Borrow Records
      this.hasMany(models.materials_borrow_records, {
        foreignKey: 'addedBy',
        as: 'added_materials_borrow_records',
        onDelete: 'RESTRICT'
      })

      // UPDATE SECTION

      this.belongsTo(models.users, {
        foreignKey: 'updatedBy',
        as: 'updated_by_librarian',
        onDelete: 'RESTRICT'
      })

      this.hasMany(models.users, {
        foreignKey: 'updatedBy',
        as: 'updated_students',
        onDelete: 'RESTRICT'
      })

      this.hasMany(models.users, {
        foreignKey: 'updatedBy',
        as: 'updated_staffs',
        onDelete: 'RESTRICT'
      })

      // Updated Author_details
      this.hasMany(models.author_details, {
        foreignKey: 'updatedBy',
        as: 'updated_author_details',
        onDelete: 'RESTRICT'
      })

      // Updated Authors
      this.hasMany(models.authors, {
        foreignKey: 'updatedBy',
        as: 'updated_authors',
        onDelete: 'RESTRICT'
      })

      // Updated Buildings
      this.hasMany(models.buildings, {
        foreignKey: 'updatedBy',
        as: 'updated_buildings',
        onDelete: 'RESTRICT'
      })

      // Updated Copies
      this.hasMany(models.copies, {
        foreignKey: 'updatedBy',
        as: 'updated_copies',
        onDelete: 'RESTRICT'
      })

      // Updated Favorites
      this.hasMany(models.favorites, {
        foreignKey: 'updatedBy',
        as: 'updated_favorites',
        onDelete: 'RESTRICT'
      })
      
      // Updated Genres
      this.hasMany(models.genres, {
        foreignKey: 'updatedBy',
        as: 'updated_genres',
        onDelete: 'RESTRICT'
      })

      // Updated Languages
      this.hasMany(models.languages, {
        foreignKey: 'updatedBy',
        as: 'updated_languages',
        onDelete: 'RESTRICT'
      })

      // Updated Material Types
      this.hasMany(models.material_types, {
        foreignKey: 'updatedBy',
        as: 'updated_material_types',
        onDelete: 'RESTRICT'
      })

      // Updated Materials
      this.hasMany(models.materials, {
        foreignKey: 'updatedBy',
        as: 'updated_materials',
        onDelete: 'RESTRICT'
      })

      // Updated Publication Countries
      this.hasMany(models.publication_countries, {
        foreignKey: 'updatedBy',
        as: 'updated_publication_countries',
        onDelete: 'RESTRICT'
      })

      // Updated Publishers
      this.hasMany(models.publishers, {
        foreignKey: 'updatedBy',
        as: 'updated_publishers',
        onDelete: 'RESTRICT'
      })

      // Updated Rooms
      this.hasMany(models.rooms, {
        foreignKey: 'updatedBy',
        as: 'updated_rooms',
        onDelete: 'RESTRICT'
      })

      // Updated Shelves
      this.hasMany(models.shelves, {
        foreignKey: 'updatedBy',
        as: 'updated_shelves',
        onDelete: 'RESTRICT'
      })
      
      // Updated Transactions
      this.hasMany(models.transactions, {
        foreignKey: 'updatedBy',
        as: 'updated_transactions',
        onDelete: 'RESTRICT'
      })

      // Updated Weedings
      this.hasMany(models.weedings, {
        foreignKey: 'updatedBy',
        as: 'updated_weedings',
        onDelete: 'RESTRICT'
      })

      // Updated Materials Borrow Records
      this.hasMany(models.materials_borrow_records, {
        foreignKey: 'updatedBy',
        as: 'updated_materials_borrow_records',
        onDelete: 'RESTRICT'
      })
      
      //RETURN PROCESS
      this.hasMany(models.materials_borrow_records, {
        foreignKey: 'return_processBy',
        as: 'returned_materials_borrow_records',
        onDelete: 'RESTRICT'
      })
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

    contactNumber: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg : "Contact Number is required"},
          notEmpty: { msg : 'Contact Number should not be empty'},
        },
        unique: {msg: "Contact Number already exists."},
    },

    profilePic: {
      type: DataTypes.STRING,
    },

    gender:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn:{
          args: [["Male", "Female"]],
          msg: "Gender should be Male or Female.",
        },
      },
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
    modelName: 'users',
  });
  return users;
};