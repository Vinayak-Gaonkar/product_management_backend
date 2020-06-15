module.exports = (sequelize, type) => {
    let review = sequelize.define('review', {
        review_id:{
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        customer_id: {
            type: type.INTEGER,
            allowNull: false
        },
        product_id: {
            type: type.INTEGER,
            allowNull: false
        },
        review:{
            type: type.STRING,
            allowNull: false
        },
        rating:{
            type: type.STRING,
            allowNull: false
        },
        created_on:{
            type: type.DATE,
            defaultValue: type.NOW 
        }
    }, { tableName: 'review', timestamps: false })
    review.associate = function (models) {
        review.belongsTo(models.product, { as: 'productDetails', foreignKey: 'product_id', targetKey: 'product_id' });
        review.belongsTo(models.Users,{as:'customerDetails', foreignKey:'customer_id', targetKey:'customer_id'})
     }

    return review
}