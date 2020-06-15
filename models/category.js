module.exports = (sequelize, type) => {
    let category = sequelize.define('category', {
      category_id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          department_id:{
            type: type.STRING,
            allowNull: false
          },
          name:{
            type: type.STRING,
            allowNull: false
          },
          description:{
            type: type.STRING
          }
    }, { tableName: 'category', timestamps: false })

    category.associate = function (models) {
      category.hasMany(models.product_category, { as: "categoryId", foreignKey: 'category_id' });
      category.belongsTo(models.department,{as:'categoryDetails', foreignKey:'department_id', targetKey:'department_id'});
   }

    return category
}