'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ad = sequelize.define('Ad', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {});
  Ad.associate = (models) => {
    // associations can be defined here
  };
  return Ad;
};

