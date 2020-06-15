"use strict";

module.exports = (sequelize, type) => {
  let Users = sequelize.define('Users', {
    customer_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      allowNull: false
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    credit_card: {
      type: type.TEXT
    },
    address_1: {
      type: type.STRING
    },
    address_2: {
      type: type.STRING
    },
    city: {
      type: type.STRING
    },
    region: {
      type: type.STRING
    },
    postal_code: {
      type: type.STRING
    },
    country: {
      type: type.STRING
    },
    shipping_region_id: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    day_phone: {
      type:type.STRING
    },
    eve_phone: {
      type:type.STRING
    },
    mob_phone: {
      type:type.STRING
    }
  },{ indexes: [ { unique: true, fields: [ 'email' ] },{fields: [ 'shipping_region_id' ] } ],tableName: 'users',timestamps: false});
  return Users;
}