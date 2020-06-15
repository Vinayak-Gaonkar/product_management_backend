const path = require('path'),
    Model = require(path.resolve('.') + '/models'),
    logger = require(path.resolve('.') + '/utils/logger'),
    redis = require(path.resolve('.') + '/utils/redisHelper'),
    utils = require(path.resolve('.') + '/utils/utils'),
    config = require(path.resolve('.') + '/config'),
    Sequelize = require("sequelize"),
    Op = Sequelize.Op;

let Product = function () {
    this.listProducts = async (data) => {
        try {

            let query = pagination(Number(data.page) || 1, Number(data.limit) || 20)
            console.log(data);

            logger.info("[web] [router] [user] [controller] listProducts called");
            let userInfo = await Model.product.findAndCountAll(query);
            return userInfo;
        } catch (error) {
            logger.error("[web] [router] [user] [controller]  listProducts failed", error);
            throw error;
        }
    }
    this.searchProducts = async (data) => {
        logger.info("[web] [router] [user] [controller] searchProduct called");
        let result = await Model.product.findAll({
            limit: Number(data.limit) || 20,
            where: {
                name: {
                    [Op.like]: `%${data.query_string}%`
                }
            }
        });
        console.log(result);
        return result
    }
    this.listProduct = async (data) => {
        try {
            console.log(data.id);

            let product = await Model.product.findAll({
                where: {
                    product_id: {
                        [Op.eq]: data.id
                    }
                }
            });
            console.log(product);

            if (product) {
                return product
            } else {
                return {
                    message: "search not found"
                };
            }
        } catch (error) {

        }
    }

    this.searchByCategory = async (cetegory, data) => {
        logger.info("[web] [router] [user] [controller]  searchByCategory called", cetegory);

        try {
            let query = pagination(Number(data.page) || 1, Number(data.limit) || 20)
            console.log("--->", query);
            query.where = {
                category_id: {
                    [Op.eq]: cetegory.id
                }
            }
            query.include = [
                {
                    model: Model.product,
                    as: 'productId'
                }
            ];
            let product = await Model.product_category.findAll(query);
            // console.log("=======>",product);
            return product
        } catch (error) {
            logger.error("[web] [router] [user] [controller]  searchByCategory failed", error);
            throw error;
        }

    }

    this.searchByDepartment = async (department) => {

        logger.info("[web] [router] [user] [controller]  searchByDepartment called", department);
        try {
            let allProducts = []
            let productList = await Model.category.findAll({
                attributes: { exclude: ['description', 'category_id', 'department_id', 'name'] },
                where: {
                    department_id: {
                        [Op.eq]: department.id
                    }
                },
                include: [{
                    model: Model.product_category,
                    attributes: { exclude: ['category_id'] },
                    as: 'categoryId',
                    include: [{
                        model: Model.product,
                        as: 'productId'
                    }]
                }]
            })
            JSON.parse(JSON.stringify(productList)).map(element => {
                element.categoryId.map(ele => allProducts.push(ele.productId))
            })
            return allProducts
        } catch (error) {
            logger.error("[web] [router] [user] [controller]  searchByDepartment failed", error);
            throw error;
        }

    }

    this.productDetailsById = async (params) => {
        logger.info("[web] [router] [user] [controller]  productDetailsById called", params);
        try {
            let productDetails = await Model.product.findOne({
                where: {
                    product_id: {
                        [Op.eq]: params.id
                    }
                }
            })
            return productDetails
        } catch (error) {
            logger.error("[web] [router] [user] [controller]  productDetailsById failed", error);
            throw error;
        }

    }

    this.productLocation = async (data) => {
        logger.info('web | router | api | product | productLocation', data);
        try {

            let result = {};
            let productList = await Model.product.findOne({
                attributes: { exclude: ['description', 'name', 'display', 'thumbnail', 'image_2', 'image', 'discounted_price', 'price', 'name'] },
                where: {
                    product_id: {
                        [Op.eq]: data.id
                    }
                },
                include: [{
                    model: Model.product_category,
                    attributes: { exclude: ['category_id'] },
                    as: 'productId',
                    include: [{
                        model: Model.category,
                        attributes: { exclude: ['description'] },
                        as: 'categoryId',
                        include: [{
                            model: Model.department,
                            attributes: { exclude: ['description'] },
                            as: "categoryDetails"
                        }]
                    }]
                }]
            })
            let productResult = JSON.parse(JSON.stringify(productList));
            result.category_id = productResult.productId.categoryId.category_id || '';
            result.department_id = productResult.productId.categoryId.department_id || '';
            result.department_name = productResult.productId.categoryId.categoryDetails.name || '';
            result.category_name = productResult.productId.categoryId.name || '';

            return result;

        } catch (error) {
            logger.error('web | router | api | product | productLocation | error', error);
            throw error
        }
    }

    this.createReview = async (params, data, header) => {
        logger.info('web | router | api | product | createReview', data);
        try {
            data.product_id = params.id;
            let userDetails = await utils.getTokenDetail(header);
            data.customer_id = userDetails.user.customer_id;
            console.log(data);
            let review=await Model.review.create(data); 
            return review;           
        } catch (error) {
            logger.error('web | router | api | product | createReview | error', error);
            throw error
        }
    }

    this.listReviews = async (params) => {
        logger.info('web | router | api | product | listreviews', params);
        try {
            let product = await Model.review.findAll({
                where: {
                    product_id: {
                        [Op.eq]: params.id
                    }
                }
            });  
            return product;    
        } catch (error) {
            logger.error('web | router | api | product | listreviews | error', error);
            throw error
        }
    }

}



let pagination = (page = 1, limit = 20) => {
    let query = {};
    query.offset = (page - 1) * limit;
    query.limit = limit;
    return query;
}
module.exports = new Product()