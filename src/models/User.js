const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING
    },
    family_name: {
      type: DataTypes.STRING
    },
    given_name: {
      type: DataTypes.STRING
    },
    logins_count: {
      type: DataTypes.STRING
    },
    purchase_history: {
      type: DataTypes.ARRAY,
      defaultValue:[]
    },
    favorites: {
      type: DataTypes.ARRAY,
      defaultValue:[]
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    }
    // },
    // createdInDb: { 
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true,
  });
};
