const path = require('path'),
    Model = require(path.resolve('.') + '/models'),
    logger = require(path.resolve('.') + '/utils/logger'),
    redis = require(path.resolve('.') + '/utils/redisHelper'),
    utils = require(path.resolve('.') + '/utils/utils'),
    config = require(path.resolve('.') + '/config'),
    Sequelize = require("sequelize"),
    Op = Sequelize.Op;

let Department = function () {
    this.listDepartment = async () => {
        try {
            logger.info("[web] [router] [Department] [controller] listDepartment called");
            let userInfo = await Model.department.findAll({
                attributes: ['name', 'description',"department_id"]
            });
            return userInfo;
        } catch (error) {
            logger.error("[web] [router] [Department] [controller]  listDepartment failed", error);
            throw error;
        }
    }

    this.listByDepartmentId=async (params)=>{
        try {
            logger.info("[web] [router] [Department] [controller] listByDepartmentId called");
            let userInfo = await Model.department.findOne({
                where:{
                    department_id: {
                        [Op.eq]: params.id
                    }
                }
            });
            return userInfo;
        } catch (error) {
            logger.error("[web] [router] [Department] [controller]  listByDepartmentId failed", error);
            throw error;
        }
    }
}


module.exports = new Department()
