'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  token.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true
    },
    sub: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'token',
    primaryKey: false
  });
  token.beforeCreate(token => token.id = uuidv4());
  return token;
};