'use strict';
module.exports = (sequelize, DataTypes) => {
  var Year = sequelize.define('Year', {
    producedYear: DataTypes.INTEGER
  }, {});
  Year.associate = function(models) {
    // associations can be defined here
  };
  return Year;
};