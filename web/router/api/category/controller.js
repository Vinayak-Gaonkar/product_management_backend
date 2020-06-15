const path = require('path'),
    Model = require(path.resolve('.') + '/models'),
    logger = require(path.resolve('.') + '/utils/logger'),
    redis = require(path.resolve('.') + '/utils/redisHelper'),
    utils = require(path.resolve('.') + '/utils/utils'),
    config = require(path.resolve('.') + '/config'),
    Sequelize = require("sequelize"),
    Op = Sequelize.Op;

let Category = function () {
    this.listCategory = async () => {
        try {
            logger.info("[web] [router] [Category] [controller] listCategory called");
            let userInfo = await Model.category.findAll({
                attributes: ['name', 'description', "department_id", "category_id"]
            });
            return userInfo;
        } catch (error) {
            logger.error("[web] [router] [Category] [controller]  listCategory failed", error);
            throw error;
        }
    }

    this.listByCategoryId = async (params) => {
        try {
            logger.info("[web] [router] [Category] [controller] listByCategoryId called");
            let userInfo = await Model.category.findOne({
                where: {
                    department_id: {
                        [Op.eq]: params.id
                    }
                }
            });
            return userInfo;
        } catch (error) {
            logger.error("[web] [router] [Category] [controller]  listByCategoryId failed", error);
            throw error;
        }
    }

    this.getCategoryByProductId = async (params)=>{
        try {
            logger.info("[web] [router] [Category] [controller] getCategoryByProductId called");
            let categoryInfo = await Model.product_category.findOne({
                where: {
                    product_id: {
                        [Op.eq]: params.id
                    }
                },
                include: [{
                    model: Model.category,
                    attributes: { exclude: ['description'] },
                    as: 'categoryId',
                }]
            });
            let parsedInfo=JSON.parse(JSON.stringify(categoryInfo))
            return parsedInfo.categoryId;
        } catch (error) {
            logger.error("[web] [router] [Category] [controller]  getCategoryByProductId failed", error);
            throw error;
        }
    }

    this.getCategoryByDepartmentId = async (params)=>{
        try {
            logger.info("[web] [router] [Category] [controller] getCategoryByDepartmentId called");
            let categoryInfo = await Model.department.findOne({
                where: {
                    department_id: {
                        [Op.eq]: params.id
                    }
                },
                include: [{
                    model: Model.category,
                    // attributes: { exclude: ['description'] },
                    as: 'categoryDetails',
                }]
            });
            let parsedInfo=JSON.parse(JSON.stringify(categoryInfo))
            return parsedInfo.categoryDetails;
        } catch (error) {
            logger.error("[web] [router] [Category] [controller]  getCategoryByDepartmentId failed", error);
            throw error;
        }
    }
}

module.exports = new Category()
