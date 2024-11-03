const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_invites', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    cocart_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "user_invites_hash_unique"
    },
    invitee_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_invites',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_invites_hash_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hash" },
        ]
      },
      {
        name: "user_invites_cocart_id_foreign",
        using: "BTREE",
        fields: [
          { name: "cocart_id" },
        ]
      },
      {
        name: "user_invites_user_id_foreign",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
