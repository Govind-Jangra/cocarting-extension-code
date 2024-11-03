const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "users_email_unique"
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    login_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    account_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    facebook_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    google_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    apple_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    verified: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    verify_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    verify_token_until: {
      type: DataTypes.DATE,
      allowNull: true
    },
    device: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    remember_token: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_username_unique"
    },
    address_one: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address_two: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    zip_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    apt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "users_phone_number_unique"
    },
    avatar: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    selected_cocart_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    phone_verification_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone_verification_code_expire_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    phone_is_verified: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    onesignal_subscription_ids: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    onesignal_subscription_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    account_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "users_username_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "users_email_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_phone_number_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone_number" },
        ]
      },
      {
        name: "users_selected_cocart_id_foreign",
        using: "BTREE",
        fields: [
          { name: "selected_cocart_id" },
        ]
      },
    ]
  });
};
