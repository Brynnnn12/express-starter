"use strict";
const { Model } = require("sequelize");
const { hashPassword, comparePassword } = require("../utils/hashing");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nama tidak boleh kosong",
          },
          len: {
            args: [3, 50],
            msg: "Nama harus antara 3 sampai 50 karakter",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Format email tidak valid",
          },
          notEmpty: {
            msg: "Email tidak boleh kosong",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password tidak boleh kosong",
          },
          len: {
            args: [6, 100],
            msg: "Password harus antara 6 sampai 100 karakter",
          },
        },
      },
      emailVerifiedAt: {
        type: DataTypes.DATE,
        field: "email_verified_at",
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await hashPassword(user.password);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await hashPassword(user.password);
          }
        },
      },
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      freezeTableName: true,
    }
  );
  User.prototype.comparePassword = async function (password) {
    return await comparePassword(password, this.password);
  };
  return User;
};
