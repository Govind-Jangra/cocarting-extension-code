const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_loyalty', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    loyalty_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'loyalty_tasks',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    number_of_wishlist: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    add_product_to_any_wishlist: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    new_user_sign_up: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    invite_people_private_wishlist: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    add_product_externally_to_wishlist: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    click_through_to_buy_a_product: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    send_chat_message_in_any_wishlist: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    add_multiple_products_to_each_wishList: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    click_through_to_buy_a_product_on_different_days: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    invite_people_to_wishlist: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    create_cocarting_post: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    like_cocarting_on_facebook: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    add_cocarting_app_review_on_store: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    invite_people_to_your_wishlists: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    use_compare_items_feature: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    create_cocarting_poll: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    like_cocarting_on_instagram: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    visit_coupon_details_page: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'user_loyalty',
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
        name: "user_loyalty_loyalty_id_foreign",
        using: "BTREE",
        fields: [
          { name: "loyalty_id" },
        ]
      },
      {
        name: "user_loyalty_user_id_foreign",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
