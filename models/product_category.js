module.exports = (sequelize, type) => {
    let product_category = sequelize.define('product_category', {
        product_id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          category_id:{
            type: type.STRING,
            allowNull: false
          }
    }, {tableName: 'product_category',timestamps: false})
    product_category.associate = function(models) {
        product_category.belongsTo(models.product,{as:'productId', foreignKey:'product_id', targetKey:'product_id'});
        product_category.belongsTo(models.category,{as:'categoryId', foreignKey:'category_id', targetKey:'category_id'});
    }
    return product_category
}