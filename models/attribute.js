module.exports = (sequelize, type) => {
    let attribute = sequelize.define('attribute', {
        attribute_id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          name:{
            type: type.STRING,
            allowNull: false
          }
    }, { tableName: 'attribute', timestamps: false })

    attribute.associate = function (models) {
        attribute.hasMany(models.attribute_value, { as: "attributeDetail", foreignKey: 'attribute_id' });
   }

    return attribute
}