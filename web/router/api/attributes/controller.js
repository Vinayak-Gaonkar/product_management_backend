const path = require('path'),
    Model = require(path.resolve('.') + '/models'),
    logger = require(path.resolve('.') + '/utils/logger'),
    redis = require(path.resolve('.') + '/utils/redisHelper'),
    utils = require(path.resolve('.') + '/utils/utils'),
    config = require(path.resolve('.') + '/config'),
    Sequelize = require("sequelize"),
    Op = Sequelize.Op;

let Attributes = function () {

    this.listAtributes = async () => {
        try {
            logger.info("[web] [router] [Attributes] [controller] listAtributes called");
            let userInfo = await Model.attribute.findAll({
                // attributes: ['name', 'description', "department_id", "category_id"]
            });
            return userInfo;
        } catch (error) {
            logger.error("[web] [router] [Attributes] [controller]  listAtributes failed", error);
            throw error;
        }
    }

    this.listByAttributeId = async (params) => {
        try {
            logger.info("[web] [router] [Category] [controller] listByAttributeId called");
            let atributeInfo = await Model.attribute.findOne({
                where: {
                    attribute_id: {
                        [Op.eq]: params.id
                    }
                }
            });
            return atributeInfo;
        } catch (error) {
            logger.error("[web] [router] [Category] [controller]  listByAttributeId failed", error);
            throw error;
        }
    }


    this.getAttributeValueById = async (params)=>{
        try {
            logger.info("[web] [router] [Attribute] [controller] getAttributeValueById called");
            let attributeInfo = await Model.attribute_value.findAll({
                where: {
                    attribute_id: {
                        [Op.eq]: params.id
                    }
                }
            });
            return attributeInfo;
        } catch (error) {
            logger.error("[web] [router] [Attribute] [controller]  getAttributeValueById failed", error);
            throw error;
        }
    }

    this.getAttributeValueByProductId = async (params)=>{
        try {
            logger.info("[web] [router] [Attribute] [controller] getAttributeValueByProductId called");
            let attributeInfo = await Model.product_attribute.findAll({
                where: {
                    product_id: {
                        [Op.eq]: params.id
                    },
                    include: [{
                        model: Model.attribute_value,
                        // attributes: { exclude: ['description'] },
                        as: 'attributeDetail',
                    }]
                }
            });
            return attributeInfo;
        } catch (error) {
            logger.error("[web] [router] [Attribute] [controller]  getAttributeValueByProductId failed", error);
            throw error;
        }
    }
}

module.exports = new Attributes();
