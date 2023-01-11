const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('comment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    reports: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    }
  }, {
    paranoid: true
  });
}
