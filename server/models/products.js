const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    product_category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'product_categories',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    brand_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    product_tracking_url: {
      type: DataTypes.STRING(2500),
      allowNull: true
    },
    standard_shipping_rate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    size: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    marketplace: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    model_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    seller_info: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    customer_rating: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    number_of_reviews: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rhid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bundle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    clearance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    preorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    stock: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    freight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "m"
    },
    affiliate_add_to_cart_url: {
      type: DataTypes.STRING(2500),
      allowNull: true
    },
    max_number_of_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    offer_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    available_online: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    e_delivery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    product_image_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'product_images',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    original_price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "products_slug_unique"
    },
    wm_product_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    product_source: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    amazon_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    added_by: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
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
        name: "products_slug_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slug" },
        ]
      },
      {
        name: "products_product_category_id_foreign",
        using: "BTREE",
        fields: [
          { name: "product_category_id" },
        ]
      },
      {
        name: "products_product_image_id_foreign",
        using: "BTREE",
        fields: [
          { name: "product_image_id" },
        ]
      },
      {
        name: "products_added_by_foreign",
        using: "BTREE",
        fields: [
          { name: "added_by" },
        ]
      },
    ]
  });
};
