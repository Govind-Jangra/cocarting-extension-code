const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_favorite_brands_retailers', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    brand_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'brands',
        key: 'id'
      }
    },
    retailer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'retailers',
        key: 'id'
      }
    },
    favorite_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_favorite_brands_retailers',
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
        name: "user_favorite_brands_retailers_user_id_foreign",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_favorite_brands_retailers_brand_id_foreign",
        using: "BTREE",
        fields: [
          { name: "brand_id" },
        ]
      },
      {
        name: "user_favorite_brands_retailers_retailer_id_foreign",
        using: "BTREE",
        fields: [
          { name: "retailer_id" },
        ]
      },
    ]
  });
};
