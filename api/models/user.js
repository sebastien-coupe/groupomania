'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING(40)
    },
    lastName: {
      type: DataTypes.STRING(40)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING(100)
    },
    avatarUrl: {
      type: DataTypes.STRING
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};