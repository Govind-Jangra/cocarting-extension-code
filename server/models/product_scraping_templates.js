const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_scraping_templates', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    website_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "website_name"
    },
    template: {
      type: DataTypes.JSON,
      allowNull: false
    },
    is_manual_modified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'product_scraping_templates',
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
        name: "website_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "website_name" },
        ]
      },
    ]
  });
};
