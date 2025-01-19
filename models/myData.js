const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class myData extends Model {}


// create fields/columns for Post model
myData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'myData'
  }
);

module.exports = myData;
