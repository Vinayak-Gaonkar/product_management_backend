module.exports = (sequelize, type) => {
    let product_attribute = sequelize.define('product_attribute', {
        product_id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          attribute_value_id:{
            type: type.INTEGER,
            allowNull: false
          }
    }, { tableName: 'product_attribute', timestamps: false })

    product_attribute.associate = function (models) {
        product_attribute.belongsTo(models.product,{as:'productId', foreignKey:'product_id', targetKey:'product_id'});
        product_attribute.belongsTo(models.attribute_value,{as:'attributeDetail', foreignKey:'attribute_value_id', targetKey:'attribute_value_id'});
   }

    return product_attribute
}