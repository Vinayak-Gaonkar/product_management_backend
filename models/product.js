module.exports = (sequelize, type) => {
    let product = sequelize.define('product', {
        product_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.STRING,
            allowNull: false
        },
        price: {
            type: type.FLOAT,
            allowNull: false
        },
        discounted_price: {
            type: type.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        },
        image: {
            type: type.STRING,
            allowNull: false
        },
        image_2: {
            type: type.STRING,
            allowNull: false
        },
        thumbnail: {
            type: type.STRING,
            allowNull: false
        },
        display: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, { tableName: 'product', timestamps: false });
    product.associate = function (models) {
        product.hasOne(models.product_category,{as:"productId", foreignKey:'product_id'});
     }
    return product
}