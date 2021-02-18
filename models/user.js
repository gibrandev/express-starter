'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    block: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
    primaryKey: false
  });
  user.beforeCreate(user => user.id = uuidv4());
  return user;
};