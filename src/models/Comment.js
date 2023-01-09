const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('comment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  }, {
    paranoid: true
  });
}
