module.exports = (sequelize, type) => {
    let attribute_value = sequelize.define('attribute_value', {
        attribute_value_id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          attribute_id:{
            type: type.INTEGER,
            allowNull: false
          },
          value:{
            type: type.STRING,
            allowNull: false
          }
    }, { tableName: 'attribute_value', timestamps: false })

    attribute_value.associate = function (models) {
        attribute_value.hasMany(models.product_attribute, { as: "productAttributeDetail", foreignKey: 'attribute_value_id' });   
    }

    return attribute_value
}