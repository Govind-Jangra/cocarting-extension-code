const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('giftcards', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    loyalty_task_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'loyalty_tasks',
        key: 'id'
      }
    },
    logo_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    reward_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    redeem_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'giftcards',
    timestamps: true,
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
        name: "giftcards_loyalty_task_id_foreign",
        using: "BTREE",
        fields: [
          { name: "loyalty_task_id" },
        ]
      },
    ]
  });
};
