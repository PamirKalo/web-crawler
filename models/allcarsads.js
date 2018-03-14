'use strict';
module.exports = (sequelize, DataTypes) => {
  const allCarsAds = sequelize.define('allCarsAds', {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    provider: DataTypes.STRING,
  }, {});
  allCarsAds.associate = (models)=> {
    // associations can be defined here
  };
  return allCarsAds;
};
