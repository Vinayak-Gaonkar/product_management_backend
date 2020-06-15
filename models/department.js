module.exports = (sequelize, type) => {
    let department = sequelize.define('department', {
        department_id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          name:{
            type: type.STRING,
            allowNull: false
          },
          description:{
            type: type.STRING
          }
    }, { tableName: 'department', timestamps: false })
    department.associate = function (models) {
        department.hasMany(models.category,{as:'categoryDetails',foreignKey:'department_id'});
     }

    return department
}